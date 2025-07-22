"use client";

import { TypeAnimation } from 'react-type-animation';

export default function MyTypeAnimation() {
  return (
    <TypeAnimation
      wrapper="span"
      className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
      sequence={[
        'AI-Powered Diagnoses in Seconds',
        2000,
        '',
      ]}
      speed={50}
      repeat={Infinity}
    />
  );
}

