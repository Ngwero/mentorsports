/**
 * PopupStorage — localStorage persistence for MSIA promotional popup display rules.
 *
 * Rules:
 * - First visit day: show once after delay; if closed, hide until next calendar day.
 * - Returning visitors: max 2 displays per day, minimum 4 hours between shows.
 * - Never show after "don't show again", successful registration, or on excluded paths.
 */

const STORAGE_KEY = "ms-msia-popup";

/** Minimum gap between popup displays for returning visitors (4 hours) */
export const POPUP_RETURNING_INTERVAL_MS = 4 * 60 * 60 * 1000;

/** Delay before auto-showing popup (3 seconds) */
export const POPUP_AUTO_SHOW_DELAY_MS = 3000;

/** Max displays per day for returning visitors */
export const POPUP_MAX_DAILY_RETURNS = 2;

/** Max displays on a visitor's first day */
export const POPUP_MAX_FIRST_DAY = 1;

export interface PopupStorageState {
  /** ISO date (YYYY-MM-DD) of the user's first site visit */
  firstVisitDate: string | null;
  /** Unix ms when popup was last displayed */
  lastShownAt: number | null;
  /** Number of times popup was shown on displayCountDate */
  displayCountToday: number;
  /** ISO date (YYYY-MM-DD) for daily counter reset */
  displayCountDate: string | null;
  /** User opted out permanently via checkbox */
  dontShowAgain: boolean;
  /** User completed talent program registration */
  registrationSubmitted: boolean;
}

const defaultState = (): PopupStorageState => ({
  firstVisitDate: null,
  lastShownAt: null,
  displayCountToday: 0,
  displayCountDate: null,
  dontShowAgain: false,
  registrationSubmitted: false,
});

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readRaw(): PopupStorageState {
  if (typeof window === "undefined") return defaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function write(state: PopupStorageState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — popup rules degrade gracefully
  }
}

/** Ensure first-visit date is set and daily counter is rolled over if needed */
function normalize(state: PopupStorageState): PopupStorageState {
  const today = todayKey();
  const next = { ...state };

  if (!next.firstVisitDate) {
    next.firstVisitDate = today;
  }

  if (next.displayCountDate !== today) {
    next.displayCountDate = today;
    next.displayCountToday = 0;
  }

  return next;
}

function isFirstVisitDay(state: PopupStorageState): boolean {
  const today = todayKey();
  return (state.firstVisitDate ?? today) === today;
}

export const PopupStorage = {
  getState(): PopupStorageState {
    return normalize(readRaw());
  },

  /** Whether popup is allowed to show on the given pathname */
  shouldShow(pathname: string, excludedPaths: readonly string[]): boolean {
    const state = normalize(readRaw());

    if (excludedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      return false;
    }

    if (state.dontShowAgain) return false;
    if (state.registrationSubmitted) return false;

    if (isFirstVisitDay(state)) {
      return state.displayCountToday < POPUP_MAX_FIRST_DAY;
    }

    if (state.displayCountToday >= POPUP_MAX_DAILY_RETURNS) return false;

    if (
      state.lastShownAt !== null &&
      Date.now() - state.lastShownAt < POPUP_RETURNING_INTERVAL_MS
    ) {
      return false;
    }

    return true;
  },

  /** Record that the popup was displayed */
  recordShown(): PopupStorageState {
    const state = normalize(readRaw());
    state.displayCountToday += 1;
    state.lastShownAt = Date.now();
    write(state);
    return state;
  },

  /** User checked "Don't show this again" */
  setDontShowAgain(): PopupStorageState {
    const state = normalize(readRaw());
    state.dontShowAgain = true;
    write(state);
    return state;
  },

  /** User successfully submitted the talent registration form */
  markRegistrationSubmitted(): PopupStorageState {
    const state = normalize(readRaw());
    state.registrationSubmitted = true;
    write(state);
    return state;
  },

  /** For testing / admin reset */
  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
