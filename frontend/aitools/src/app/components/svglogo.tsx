import React from "react";

const AbstractNetwork: React.FC = () => (
  <svg className="mx-auto h-15 w-auto"
  viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="none">
    {/* Gradient Definitions */}
    <defs>
      <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#6AC9B5" }} />
        <stop offset="100%" style={{ stopColor: "#5A8F93" }} />
      </radialGradient>
      <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#8A82BE" }} />
        <stop offset="100%" style={{ stopColor: "#625DA8" }} />
      </radialGradient>
      <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#F39078" }} />
        <stop offset="100%" style={{ stopColor: "#E05B8A" }} />
      </radialGradient>
    </defs>

    {/* Lines connecting circles */}
    <line x1="150" y1="350" x2="200" y2="300" stroke="white" strokeWidth="2" />
    <line x1="200" y1="300" x2="250" y2="250" stroke="white" strokeWidth="2" />
    <line x1="250" y1="250" x2="300" y2="200" stroke="white" strokeWidth="2" />
    <line x1="200" y1="300" x2="300" y2="300" stroke="white" strokeWidth="2" />
    <line x1="300" y1="300" x2="350" y2="250" stroke="white" strokeWidth="2" />
    <line x1="250" y1="250" x2="150" y2="250" stroke="white" strokeWidth="2" />
    <line x1="150" y1="250" x2="200" y2="200" stroke="white" strokeWidth="2" />

    {/* Circles with updated gradient fill */}
    <circle cx="150" cy="350" r="30" fill="url(#grad1)" />
    <circle cx="200" cy="300" r="30" fill="url(#grad2)" />
    <circle cx="250" cy="250" r="30" fill="url(#grad2)" />
    <circle cx="300" cy="300" r="30" fill="url(#grad2)" />
    <circle cx="300" cy="200" r="30" fill="url(#grad3)" />
    <circle cx="350" cy="250" r="30" fill="url(#grad3)" />
    <circle cx="150" cy="250" r="30" fill="url(#grad1)" />
    <circle cx="200" cy="200" r="30" fill="url(#grad2)" />
  </svg>
);

export default AbstractNetwork;
