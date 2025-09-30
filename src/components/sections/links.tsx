import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSound } from "../../hooks/useSound";
import { faLinkedin, faGithub, type IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileLines } from "@fortawesome/free-solid-svg-icons";

type LinksSectionProps = {
  pageView: string;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
};

export default function LinksSection({ pageView, setPageView, isMobile }: Readonly<LinksSectionProps>) {
  const { playHover, playClick } = useSound("/hover_sound.mp3", "/click_sound.mp3");

  const options: {
    label: string;
    url: string;
    icon: IconDefinition;
  }[] = [
    { label: "Github", url: "https://github.com/apreswilson", icon: faGithub },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/awilsofl/", icon: faLinkedin },
    {
      label: "Resume",
      url: "https://drive.google.com/file/d/1YfTX3Kr3tJVIO1BV4UiDRIT2UwBeL1UT/view?usp=sharing",
      icon: faFileLines,
    },
    { label: "Email", url: "mailto:apreswilson@gmail.com", icon: faEnvelope },
  ];
  const [activeLink, setActiveLink] = useState<string>(isMobile ? " " : "Github");

  const handleMouseOver = (option: string) => {
    if (!isMobile) {
      setActiveLink(option);
      playHover();
    }
  };

  const updateActiveOption = (position: number, movement: "up" | "down") => {
    if (!isMobile) {
      if (movement === "up" && position > 0) {
        setActiveLink(options[position - 1].label);
        playHover();
      } else if (movement === "down" && position < options.length - 1) {
        setActiveLink(options[position + 1].label);
        playHover();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile || pageView !== "Links") return;

      const currentIndex = options.findIndex((option) => option.label === activeLink);

      if (/^(ArrowDown|j)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "down");
      } else if (/^(ArrowUp|k)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "up");
      } else if (e.key === "Enter") {
        const option = options[currentIndex];
        if (option) {
          playClick();
          window.location.assign(option.url);
        }
      } else if (e.key === "Escape") {
        playClick();
        setPageView("Home");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageView, activeLink, options, setPageView]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-screen w-11/12 md:w-1/2 lg:w-1/3 justify-center transition-all duration-100 absolute top-0 left-1/2 -translate-x-1/2",
        pageView !== "Links" ? "invisible opacity-0" : "opacity-100"
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
      <h1 className="z-50 text-red-500 text-center text-6xl mb-7">Links</h1>

      {options.map((option) => (
        <button
          key={option.label}
          role="listitem"
          aria-current={activeLink === option.label ? "true" : undefined}
          aria-label={`Select ${option}`}
          className={clsx(
            "player-text outline-0 text-4xl p-4 bg-gray-100/50 z-50 cursor-pointer hover:bg-gray-200 transition-all w-full md:w-[30rem] md:mx-auto flex gap-4",
            activeLink === option.label && "text-red-500 bg-gray-200 -translate-y-1"
          )}
          onMouseEnter={() => handleMouseOver(option.label)}
          onClick={() => {
            setActiveLink(option.label);
            window.location.assign(option.url);
            playClick();
          }}
        >
          <FontAwesomeIcon icon={option.icon} />
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
