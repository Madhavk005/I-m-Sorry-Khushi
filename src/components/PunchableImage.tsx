
import { useState, useCallback, useRef } from 'react';
import { toast } from "sonner";

interface Point {
  x: number;
  y: number;
}

interface Ripple extends Point {
  id: number;
}

export const PunchableImage = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [punchCount, setPunchCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rippleIdRef = useRef(0);

  const handlePunch = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsAnimating(true);
    setPunchCount(prev => {
      const newCount = prev + 1;
      if (newCount === 1) {
        toast("First punch landed! Keep going!");
      } else if (newCount === 10) {
        toast("Wow! You're on fire! 🔥");
      } else if (newCount === 50) {
        toast("You're a punching machine!");
      }
      return newCount;
    });

    const newRipple = {
      x,
      y,
      id: rippleIdRef.current++
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
      <div
        className={`relative w-full h-full ${isAnimating ? 'animate-punch' : ''}`}
        onClick={handlePunch}
      >
        {/* Replace the src with your actual image URL */}
        <img
          src="/placeholder.svg"
          alt="Punchable face"
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {ripples.map(({ x, y, id }) => (
          <div
            key={id}
            className="absolute w-4 h-4 -mt-2 -ml-2 bg-white/30 rounded-full animate-ripple"
            style={{ left: x, top: y }}
          />
        ))}
      </div>
      
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        Punches: {punchCount}
      </div>
    </div>
  );
};
