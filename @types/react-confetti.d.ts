declare module 'react-confetti' {
  import React from 'react';

  interface ConfettiProps {
    width: number;
    height: number;
    numberOfPieces?: number;
    recycle?: boolean;
    colors?: string[];
    gravity?: number;
    wind?: number;
    friction?: number;
    initialVelocityX?: number;
    initialVelocityY?: number;
  }

  const Confetti: React.FC<ConfettiProps>;
  export default Confetti;
}
