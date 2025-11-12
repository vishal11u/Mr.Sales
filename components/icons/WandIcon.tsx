import React from 'react';

export const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 7.5h-1" />
    <path d="M7.5 7.5h-1" />
    <path d="M20 9.5V8.5" />
    <path d="M4 9.5V8.5" />
    <path d="m18 13-1.5-1.5" />
    <path d="m6 13-1.5-1.5" />
    <path d="m19 6-1.5-1.5" />
    <path d="m5 6-1.5-1.5" />
    <path d="M12 22v-3" />
    <path d="M12 11a4 4 0 0 0-4 4v4h8v-4a4 4 0 0 0-4-4Z" />
  </svg>
);