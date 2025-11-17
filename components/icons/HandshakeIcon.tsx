import React from 'react';

export const HandshakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m5 15 2.5-2.5a1 1 0 1 1 3 3l-2.5 2.5" />
    <path d="m14 14 3 3" />
    <path d="M22 12v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3" />
    <path d="M12 11.5 8.5 8" />
    <path d="M2 12v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
  </svg>
);
