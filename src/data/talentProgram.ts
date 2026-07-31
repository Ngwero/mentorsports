export const msiaTalentProgram = {
  id: "msia-talent-program",
  eyebrow: "MSIA Talent Identification",
  title: "Football Talent Identification Program",
  subtitle:
    "A once-in-a-lifetime pathway for Uganda's brightest young players to be seen by European scouts at an international tournament in Kenya.",
  highlight:
    "European scouting opportunity featuring scouts from Germany — select players aged 13–17 represent Uganda at the WSH International Tournament.",
  bullets: [
    "Ages 13–17",
    "International Tournament in Kenya",
    "Only 32 Players Selected",
    "December 8–17",
    "Limited Slots Available",
  ],
  dates: "December 8–17",
  location: "WSH International Tournament, Kenya",
  slots: 32,
  ageRange: "13–17",
  ctaPrimary: "Register Now",
  ctaSecondary: "Learn More",
} as const;

export const talentPopupContent = {
  headline: "Give Your Child the Chance to Be Seen by European Scouts",
  subheadline:
    "Applications are now open for talented football players aged 13–17 to represent Uganda at the WSH International Tournament in Kenya.",
  highlight:
    "European scouting opportunity featuring scouts from Germany.",
  bullets: msiaTalentProgram.bullets,
  primaryCta: "Register Now",
  secondaryCta: "Learn More",
  dontShowLabel: "Don't show this again",
} as const;

/** Paths where the promotional popup must not appear */
export const popupExcludedPaths = ["/trials"] as const;

export const msiaSectionId = msiaTalentProgram.id;
