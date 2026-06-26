"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";

interface VideoModalProps {
  videoId: string | null;
  title: string;
  youtubeUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({
  videoId,
  title,
  youtubeUrl,
  isOpen,
  onClose,
}: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) {
    return null;
  }

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="video-modal-backdrop"
        onClick={onClose}
        aria-label="Close video"
      />

      <div className="video-modal-panel">
        <button
          type="button"
          onClick={onClose}
          className="video-modal-close"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="video-modal-player">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-modal-iframe"
          />
        </div>

        <div className="video-modal-footer">
          <h3 className="video-modal-title">{title}</h3>
          {youtubeUrl && (
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-modal-youtube-link"
            >
              Watch on YouTube
              <ExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
