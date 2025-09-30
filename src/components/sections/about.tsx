import clsx from "clsx";
import type { SectionProps } from "../../types/props";
import { useSound } from "../../hooks/useSound";
import { useEffect, useState } from "react";
import AboutContent from "./aboutContent";

export default function AboutSection({ pageView, setPageView, isMobile }: Readonly<SectionProps>) {
  const options: { label: string; description: string }[] = [
    { label: "Tech", description: "Tech desc" },
    { label: "Non-Tech", description: "Non-Tech desc" },
  ];
  const { playHover, playClick } = useSound("/hover_sound.mp3", "/click_sound.mp3");
  const [activeOption, setActiveOption] = useState<string>(isMobile ? " " : "Tech");

  const updateActiveOption = (position: number, movement: "left" | "right") => {
    if (!isMobile) {
      if (movement === "left" && position > 0) {
        setActiveOption(options[position - 1].label);
        playHover();
      } else if (movement === "right" && position < options.length - 1) {
        setActiveOption(options[position + 1].label);
        playHover();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile || pageView !== "About") return;

      const currentIndex = options.findIndex((option) => option.label === activeOption);

      if (/^(ArrowLeft|h)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "left");
      } else if (/^(ArrowRight|l)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "right");
      } else if (e.key === "Enter") {
        console.log("Confirmed");
      } else if (e.key === "Escape") {
        playClick();
        setPageView("Home");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageView, activeOption, options, setPageView]);

  const handleMouseOver = () => {
    if (!isMobile) {
      playHover();
    }
  };

  const handleClick = (option: string) => {
    if (!isMobile) {
      playClick();
      setActiveOption(option);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-screen w-11/12 md:w-1/2 lg:w-1/3 justify-center transition-all duration-100 absolute top-0 left-1/2 -translate-x-1/2",
        pageView !== "About" ? "invisible opacity-0" : "opacity-100"
      )}
    >
      <button
        onClick={() => {
          playClick();
          setPageView("Home");
        }}
        onMouseEnter={playHover}
        className="outline-0 p-4 bg-gray-100/50 z-50 cursor-pointer hover:bg-gray-200 transition-all w-max hover:text-red-500 hover:-translate-y-1"
      >
        Back {!isMobile && <span>(Esc)</span>}
      </button>
      <h1 className="z-50 text-red-500 text-center text-6xl mb-7">About</h1>

      <div className="flex gap-1">
        {options.map((option) => (
          <button
            className={clsx(
              "w-1/2 p-4 hover:bg-gray-200 hover:text-red-500 hover:-translate-y-1 transition-all duration-100o cursor:pointer bg-gray-100/50 outline-none cursor-pointer",
              activeOption === option.label && "text-red-500 bg-gray-200 -translate-y-1"
            )}
            key={option.label}
            role="listitem"
            aria-current={activeOption === option.label ? "true" : undefined}
            aria-label={`Select ${option}`}
            onMouseOver={handleMouseOver}
            onClick={() => handleClick(option.label)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <AboutContent view={activeOption} />
    </div>
  );
}
