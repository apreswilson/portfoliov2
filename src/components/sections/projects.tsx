import clsx from "clsx";
import type { SectionProps } from "../../types/props";
import { useSound } from "../../hooks/useSound";
import { useEffect, useState } from "react";

export default function ProjectSection({ pageView, setPageView, isMobile }: Readonly<SectionProps>) {
  const options: { label: string; description: string; demo: string; code: string; img: string }[] = [
    {
      label: "Tabz",
      description: "A minimal business management platform that allows users to create and/or join organizations.",
      demo: "https://tabz-alpha.vercel.app/",
      code: "https://github.com/apreswilson/tabz",
      img: "/tabz.png",
    },
    {
      label: "Foodshop",
      description: "An online grocery store where customers can purchase groceries and/or add savings all online.",
      demo: "https://foodshop-weld.vercel.app/",
      code: "https://github.com/apreswilson/foodshop",
      img: "/foodshop.png",
    },
    {
      label: "Calendar",
      description: "A minimal calendar website that allows you to make an account, and add events to your calendar.",
      demo: "https://foodshop-weld.vercel.app/",
      code: "https://apreswilson.github.io/calendar/",
      img: "/calendar.png",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<(typeof options)[0] | null>(null);
  const { playHover, playClick } = useSound("/hover_sound.mp3", "/click_sound.mp3");
  const [activeOption, setActiveOption] = useState<string>(isMobile ? " " : "Tabz");
  const [modalFocus, setModalFocus] = useState<"demo" | "code">("demo");

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
  console.log("showModal", showModal, "currentProject", currentProject);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile || pageView !== "Projects") return;

      // If modal is open, handle modal navigation
      if (showModal && currentProject) {
        if (/^(ArrowLeft|h)$/i.test(e.key)) {
          setModalFocus("demo");
          playHover();
        } else if (/^(ArrowRight|l)$/i.test(e.key)) {
          setModalFocus("code");
          playHover();
        } else if (e.key === "Enter") {
          const url = modalFocus === "demo" ? currentProject.demo : currentProject.code;
          window.open(url, "_blank");
          playClick();
        } else if (e.key === "Escape") {
          setShowModal(false);
          playClick();
        }
        return;
      }

      // Otherwise, normal project navigation
      const currentIndex = options.findIndex((o) => o.label === activeOption);
      const currentItem = options[currentIndex];

      if (/^(ArrowLeft|h)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "left");
        playHover();
      } else if (/^(ArrowRight|l)$/i.test(e.key)) {
        updateActiveOption(currentIndex, "right");
        playHover();
      } else if (e.key === "Enter" && currentItem) {
        setCurrentProject(currentItem);
        setModalFocus("demo"); // default focus on Demo
        setShowModal(true);
        playClick();
      } else if (e.key === "Escape") {
        playClick();
        setPageView("Home");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOption, currentProject, showModal, options]);

  const handleMouseOver = (option: string) => {
    if (!isMobile) {
      if (showModal) {
        setModalFocus(option as "code" | "demo");
      } else {
        setActiveOption(option);
      }
      playHover();
    }
  };

  const handleClick = (
    option: string | { label: string; description: string; demo: string; code: string; img: string }
  ) => {
    if (!isMobile && typeof option === "string") {
      setActiveOption(option);
    } else if (typeof option !== "string") {
      setCurrentProject(option);
      setModalFocus("demo"); // default focus on Demo
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    playClick();
  };

  return (
    <>
      {showModal && currentProject && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4 sm:11/12 w-1/3 text-center">
            <h2 className="text-xl">What do you want to view?</h2>
            <div className="flex gap-4 justify-center">
              <button
                className={clsx(
                  "flex flex-col p-4 bg-gray-100/50 hover:bg-gray-200 transition-all text-left gap-4",
                  modalFocus === "demo" && "bg-gray-200 text-red-500 -translate-y-1 cursor-pointer"
                )}
                onMouseEnter={() => handleMouseOver("demo")}
                onClick={() => window.open(currentProject.demo, "_blank")}
              >
                Demo
              </button>
              <button
                className={clsx(
                  "flex flex-col p-4 bg-gray-100/50 hover:bg-gray-200 transition-all text-left gap-4",
                  modalFocus === "code" && "bg-gray-200 text-red-500 -translate-y-1 cursor-pointer"
                )}
                onMouseEnter={() => handleMouseOver("code")}
                onClick={() => window.open(currentProject.code, "_blank")}
              >
                Code
              </button>
            </div>
            <button
              className="text-gray-500 underline cursor-pointer"
              onClick={() => {
                setShowModal(false);
                playClick();
              }}
            >
              Cancel (ESC)
            </button>
          </div>
        </div>
      )}

      <div
        className={clsx(
          "flex flex-col gap-4 h-screen w-11/12 md:w-3/4 justify-center transition-all duration-100 absolute top-0 left-1/2 -translate-x-1/2",
          pageView !== "Projects" ? "invisible opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col gap-6 md:w-1/2 mx-auto">
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
          <h1 className="z-50 text-red-500 text-center text-6xl mb-7">Projects</h1>
        </div>

        <ul className="flex gap-6 flex-col md:flex-row sm:h-[50rem] md:h-auto overflow-y-auto">
          {options.map((option, index) => (
            <li key={option.label}>
              <button
                className={clsx(
                  "flex flex-col p-4 bg-gray-100/50 hover:bg-gray-200 transition-all text-left gap-4 cursor-pointer outline-none",
                  activeOption === option.label && "bg-gray-200 text-red-500 -translate-y-1"
                )}
                tabIndex={0} // allows focus for keyboard navigation
                onMouseEnter={() => handleMouseOver(option.label)}
                onClick={() => handleClick(option)}
              >
                <h2 className="text-xl font-bold mb-2">{option.label}</h2>
                <img src={option.img} className="rounded-lg"></img>
                <p className="text-gray-700 mb-4">{option.description}</p>
                {isMobile && (
                  <div className="flex gap-4">
                    <a
                      href={option.demo}
                      target="_blank"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                      onMouseEnter={() => !isMobile && playHover()}
                      onClick={() => !isMobile && playClick()}
                    >
                      Demo
                    </a>
                    <a
                      href={option.code}
                      target="_blank"
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all"
                      onMouseEnter={() => !isMobile && playHover()}
                      onClick={() => !isMobile && playClick()}
                    >
                      Code
                    </a>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
