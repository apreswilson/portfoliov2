import { useEffect, useRef } from "react";
import "./intro.css";
import clsx from "clsx";

type IntroProps = {
  isMobile: boolean;
  activeOption: string;
  setActiveOption: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  pageView: string;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
};
export default function IntroSection({
  isMobile,
  activeOption,
  setActiveOption,
  options,
  setPageView,
}: Readonly<IntroProps>) {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio("/hover_sound.mp3");
    clickSound.current = new Audio("/click_sound.mp3");
  }, []);

  const playHoverSound = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  const handleMouseOver = (option: string) => {
    if (!isMobile) {
      setActiveOption(option);
      playHoverSound();
    }
  };

  const updateActiveOption = (position: number, movement: "up" | "down") => {
    if (!isMobile) {
      if (movement === "up" && position > 0) {
        setActiveOption(options[position - 1]);
        playHoverSound();
      } else if (movement === "down" && position < options.length - 1) {
        setActiveOption(options[position + 1]);
        playHoverSound();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return;

      const currentIndex = options.indexOf(activeOption);

      if (/^(ArrowDown|s|j)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "down");
      } else if (/^(ArrowUp|w|k)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "up");
      } else if (/^Enter$/i.test(e.key)) {
        setPageView(activeOption);
        playClickSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOption, options, isMobile]);

  return (
    <div className="flex flex-col gap-4 h-screen w-11/12 md:w-1/2 lg:w-1/3 mx-auto justify-center">
      <h1 className="z-50 text-red-500 text-center text-6xl mb-7">Alex Wilson</h1>

      {!isMobile && (
        <p className="z-50 mb-7 leading-12 text-center">
          <span className="sr-only">Use up and down arrows, j and k, or mouse to navigate the menu options.</span>
          Use <span className="bg-gray-200 p-2">↑</span> and <span className="bg-gray-200 p-2">↓</span>,
          <span className="bg-gray-200 p-2">j</span> and <span className="bg-gray-200 p-2">k</span> (if you know, you
          know), or <span className="bg-gray-200 p-2">🖱</span> to navigate.
        </p>
      )}

      {options.map((option) => (
        <button
          key={option}
          role="listitem"
          aria-current={activeOption === option ? "true" : undefined}
          aria-label={`Select ${option}`}
          className={clsx(
            "player-text outline-0 text-4xl p-4 bg-gray-100/50 z-50 cursor-pointer hover:bg-gray-200 transition-all w-full md:w-[30rem] md:mx-auto",
            activeOption === option && "text-red-500 bg-gray-200 -translate-y-1"
          )}
          onMouseEnter={() => handleMouseOver(option)}
          onClick={() => {
            setActiveOption(option);
            setPageView(option);
            playClickSound();
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
