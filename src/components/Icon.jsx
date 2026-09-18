/* ═══════════════════════════════════════════════════════════
   SVG 图标库：全站统一线性图标，无任何 emoji
   ═══════════════════════════════════════════════════════════ */
function Svg({ children, size = 18, sw = 2, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconCalendar = (p) => (
  <Svg sw={1.8} {...p}>
    <rect x="3" y="4.5" width="18" height="17" rx="3.5" />
    <path d="M8 2.5v4M16 2.5v4M3 10.5h18" />
    <circle cx="8.2" cy="15.4" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15.4" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="15.8" cy="15.4" r="1.15" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconSun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Svg>
);

export const IconMoon = (p) => (
  <Svg {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Svg>
);

export const IconSystem = (p) => (
  <Svg {...p}>
    <rect x="2" y="3.5" width="20" height="13.5" rx="2.5" />
    <path d="M8 21h8M12 17v4" />
  </Svg>
);

export const IconGear = (p) => (
  <Svg sw={1.9} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

export const IconClose = (p) => (
  <Svg sw={2.2} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg sw={3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const IconUsers = (p) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);

export const IconInfo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4.5M12 8.2h.01" />
  </Svg>
);

export const IconWeek = (p) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="17" rx="3" />
    <path d="M8 2.5v4M16 2.5v4M3 10.5h18" />
  </Svg>
);

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5l3.2 2" />
  </Svg>
);

export const IconType = (p) => (
  <Svg {...p}>
    <path d="M4 7V5.5h16V7M12 5.5V19M8.5 19h7" />
  </Svg>
);

export const IconCode = (p) => (
  <Svg {...p}>
    <path d="M8 6 3 12l5 6M16 6l5 6-5 6" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.4-7.5 9.5-4.4-1.1-7.5-4.9-7.5-9.5V6z" />
    <path d="M9 12l2 2 4-4.5" />
  </Svg>
);

export const IconReset = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
    <path d="M3 3v5h5" />
  </Svg>
);

export const IconSave = (p) => (
  <Svg {...p}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </Svg>
);

export const IconSpark = (p) => (
  <Svg {...p}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    <circle cx="12" cy="12" r="3.5" />
  </Svg>
);

export const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconPalette = (p) => (
  <Svg {...p}>
    <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2.5 2.5 0 0 0-1.8 4.2c.5.5.8 1.1.8 1.8z" />
    <circle cx="7.8" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16.2" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconTextAa = (p) => (
  <Svg {...p}>
    <path d="M4 19 8.5 6h1L14 19M5.6 14.4h6.8" />
    <path d="M15.5 19v-4.2a2.6 2.6 0 0 1 2.6-2.6c1.6 0 2.9 1.2 2.9 3.4V19M21 16.6h-3.4a2.1 2.1 0 0 0 0 4.2c1.5 0 2.7-.9 3.4-2.4" />
  </Svg>
);

export const IconFlag = (p) => (
  <Svg {...p}>
    <path d="M5 21V4" />
    <path d="M5 4.6h11.5l-2.5 3.7 2.5 3.7H5" />
  </Svg>
);

export const IconHand = (p) => (
  <Svg {...p}>
    <path d="M8 12V5.2a1.2 1.2 0 0 1 2.4 0V11M10.4 10V3.2a1.2 1.2 0 0 1 2.4 0v6.6M12.8 9.6V4.7a1.2 1.2 0 0 1 2.4 0v6.4M15.2 11.5V7.6a1.2 1.2 0 0 1 2.4 0v6.9c0 3.9-3.1 6.5-6.3 6.5-2.4 0-3.9-1-5.4-3.1l-2.4-3.4c-.5-.7-.4-1.6.3-2.1a1.5 1.5 0 0 1 2.1.3L8 15" />
  </Svg>
);
