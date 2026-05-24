import React from "react";

function IconSvg({ className, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons = {
  manual: (className) => (
    <IconSvg className={className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H18v18H6.5A2.5 2.5 0 0 1 4 18.5V5.5Z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </IconSvg>
  ),
  sdk: (className) => (
    <IconSvg className={className}>
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </IconSvg>
  ),
  robot: (className) => (
    <IconSvg className={className}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
      <path d="M12 3v2" />
    </IconSvg>
  ),
  model: (className) => (
    <IconSvg className={className}>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M12 12 20 7.5M12 12V21M12 12 4 7.5" />
    </IconSvg>
  ),
  examples: (className) => (
    <IconSvg className={className}>
      <path d="M9 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
      <path d="M13 5h4v4M10 14 18 6" />
    </IconSvg>
  ),
  accessories: (className) => (
    <IconSvg className={className}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="4" />
      <path d="M7.5 7.5l2 2M14.5 14.5l2 2M16.5 7.5l-2 2M7.5 16.5l2-2" />
    </IconSvg>
  ),
  software: (className) => (
    <IconSvg className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 17h.01" />
    </IconSvg>
  ),
  toolchain: (className) => (
    <IconSvg className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </IconSvg>
  ),
};

export default function SectionIcon({ name, className }) {
  const render = icons[name] || icons.manual;
  return render(className);
}
