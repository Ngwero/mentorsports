"use client";

import { useEffect, useState } from "react";

interface EventCountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export default function EventCountdown({ targetDate }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <p className="text-sm font-semibold text-ms-gold uppercase tracking-wider">
        Event in progress or completed
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="countdown-circle"
          aria-label={`${unit.value} ${unit.label}`}
        >
          <p className="countdown-circle-value">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="countdown-circle-label">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
