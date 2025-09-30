import { useEffect, useRef } from "react";

export function useSound(hoverSrc: string, clickSrc: string) {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio(hoverSrc);
    clickSound.current = new Audio(clickSrc);
  }, [hoverSrc, clickSrc]);

  const playHover = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return { playHover, playClick };
}
