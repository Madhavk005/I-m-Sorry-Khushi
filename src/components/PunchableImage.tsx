
import { useState, useCallback, useRef } from 'react';
import { toast } from "sonner";

interface Point {
  x: number;
  y: number;
  intensity: number;
}

interface Ripple extends Point {
  id: number;
}

export const PunchableImage = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [punchCount, setPunchCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastPunchTime, setLastPunchTime] = useState(0);
  const rippleIdRef = useRef(0);

  const calculateIntensity = (timeDiff: number) => {
    // The faster the clicks, the more intense the punch
    if (timeDiff < 200) return 1; // Super intense
    if (timeDiff < 500) return 0.7; // Very intense
    if (timeDiff < 1000) return 0.4; // Moderate
    return 0.2; // Light punch
  };

  const getReactionMessage = (intensity: number) => {
    if (intensity >= 1) return "OUCH! That was a brutal one! 😵";
    if (intensity >= 0.7) return "Wow, you're really getting into it! 💥";
    if (intensity >= 0.4) return "Nice punch! 👊";
    return "Just a light tap! 🤛";
  };

  const handlePunch = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastPunchTime;
    const intensity = calculateIntensity(timeDiff);
    setLastPunchTime(currentTime);

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
      } else if (timeDiff < 200) {
        toast(getReactionMessage(intensity));
      }
      return newCount;
    });

    const newRipple = {
      x,
      y,
      id: rippleIdRef.current++,
      intensity
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, lastPunchTime]);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
      <div
        className={`relative w-full h-full ${isAnimating ? 'animate-punch' : ''}`}
        onClick={handlePunch}
      >
        <img
          src="/lovable-uploads/b742979a-7ffb-4919-a083-17e1edfc572a.png"
          alt="Punchable target"
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {ripples.map(({ x, y, id, intensity }) => (
          <div
            key={id}
            className="absolute w-4 h-4 -mt-2 -ml-2 rounded-full animate-ripple"
            style={{ 
              left: x, 
              top: y,
              backgroundColor: `rgba(255, 255, 255, ${0.2 + intensity * 0.3})`,
              transform: `scale(${1 + intensity})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
      </div>
      
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        Punches: {punchCount}
      </div>
    </div>
  );
};
