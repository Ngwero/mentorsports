"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PopupModal from "@/components/popup/PopupModal";
import TalentRegistrationModal from "@/components/popup/TalentRegistrationModal";
import {
  msiaSectionId,
  popupExcludedPaths,
} from "@/data/talentProgram";
import {
  POPUP_AUTO_SHOW_DELAY_MS,
  PopupStorage,
} from "@/lib/popupStorage";

/**
 * PopupManager — centralized display logic for the MSIA talent program popup.
 * Mount once in the root layout; handles timing, storage, and user actions.
 */
export default function PopupManager() {
  const pathname = usePathname();
  const router = useRouter();
  const timerRef = useRef<number | null>(null);

  const [promoOpen, setPromoOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [ready, setReady] = useState(false);

  const closePromo = useCallback(() => {
    if (dontShowAgain) {
      PopupStorage.setDontShowAgain();
    }
    setPromoOpen(false);
  }, [dontShowAgain]);

  const openRegistration = useCallback(() => {
    if (dontShowAgain) {
      PopupStorage.setDontShowAgain();
    }
    setPromoOpen(false);
    setRegistrationOpen(true);
  }, [dontShowAgain]);

  const scrollToMsiaSection = useCallback(() => {
    closePromo();

    const scroll = () => {
      const el = document.getElementById(msiaSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (pathname === "/") {
      window.setTimeout(scroll, 150);
    } else {
      router.push(`/#${msiaSectionId}`);
    }
  }, [closePromo, pathname, router]);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPromoOpen(false);

    if (!PopupStorage.shouldShow(pathname, popupExcludedPaths)) return;

    timerRef.current = window.setTimeout(() => {
      if (!PopupStorage.shouldShow(pathname, popupExcludedPaths)) return;
      PopupStorage.recordShown();
      setPromoOpen(true);
    }, POPUP_AUTO_SHOW_DELAY_MS);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname, ready]);

  useEffect(() => {
    if (pathname !== "/" || !ready) return;

    const hash = window.location.hash.replace("#", "");
    if (hash === msiaSectionId) {
      window.setTimeout(() => {
        document.getElementById(msiaSectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [pathname, ready]);

  useEffect(() => {
    const openFromSection = () => setRegistrationOpen(true);
    window.addEventListener("msia:open-registration", openFromSection);
    return () => window.removeEventListener("msia:open-registration", openFromSection);
  }, []);

  return (
    <>
      <PopupModal
        open={promoOpen}
        dontShowAgain={dontShowAgain}
        onDontShowAgainChange={setDontShowAgain}
        onClose={closePromo}
        onRegister={openRegistration}
        onLearnMore={scrollToMsiaSection}
      />
      <TalentRegistrationModal
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
      />
    </>
  );
}
