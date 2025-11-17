import React from 'react';

export const GavelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m14 12-8.5 8.5" />
    <path d="m17.5 15.5 2.5 2.5" />
    <path d="m12 15 6 6" />
    <path d="m3 21 6-6" />
    <path d="m3 3 7.5 7.5" />
    <path d="m12 6 2-2a3 3 0 0 0-4-4 3 3 0 0 0-4 4l2 2" />
    <path d="m18 12 2-2a3 3 0 0 0-4-4 3 3 0 0 0-4 4l2 2" />
  </svg>
);
