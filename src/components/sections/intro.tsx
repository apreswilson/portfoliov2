import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSound } from "../../hooks/useSound";
import type { SectionProps } from "../../types/props";

export default function IntroSection({ isMobile, pageView, setPageView }: Readonly<SectionProps>) {
  const options = ["About", "Projects", "Links"];
  const [activeOption, setActiveOption] = useState<string>(isMobile ? " " : "About");
  const { playHover, playClick } = useSound("/hover_sound.mp3", "/click_sound.mp3");

  const handleMouseOver = (option: string) => {
    if (!isMobile) {
      setActiveOption(option);
      playHover();
    }
  };

  const updateActiveOption = (position: number, movement: "up" | "down") => {
    if (!isMobile || pageView === "Home") {
      if (movement === "up" && position > 0) {
        setActiveOption(options[position - 1]);
        playHover();
      } else if (movement === "down" && position < options.length - 1) {
        setActiveOption(options[position + 1]);
        playHover();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile || pageView !== "Home") return;

      const currentIndex = options.indexOf(activeOption);

      if (/^(ArrowDown|j)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "down");
      } else if (/^(ArrowUp|k)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "up");
      } else if (/^Enter$/i.test(e.key)) {
        setPageView(activeOption);
        playClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOption, options, isMobile]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-screen w-11/12 md:w-1/2 lg:w-1/3 justify-center transition-all duration-100 absolute top-0 left-1/2 -translate-x-1/2",
        pageView !== "Home" ? "invisible opacity-0" : "opacity-100"
      )}
    >
      <h1 className="z-50 text-red-500 text-center text-6xl mb-7">Alex Wilson</h1>

      {!isMobile && (
        <p className="z-50 mb-7 leading-12 text-center">
          This website is arrow keys or vim navigation (h, j, k, l) friendly. Hit ENTER to confirm.
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
            playClick();
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
