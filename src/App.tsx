import "./App.css";
import Background from "./components/background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, type IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router";

export default function App() {

  const pages: { url: string, label: string }[] = [
    { url: "/about", label: "About" },
    { url: "/projects", label: "Projects" }
  ]

  const links: { Icon: IconDefinition; url: string }[] = [
    { Icon: faGithub, url: "https://github.com/apreswilson" },
    { Icon: faLinkedin, url: "https://www.linkedin.com/in/awilsofl/" },
    { Icon: faFileLines, url: "https://drive.google.com/file/d/1YfTX3Kr3tJVIO1BV4UiDRIT2UwBeL1UT/view?usp=sharing" },
    { Icon: faEnvelope, url: "mailto:apreswilson@gmail.com" },
  ];

  return (
    <div className="flex h-[100dvh] justify-center items-center">
      <Background />

      <div className="flex flex-col text-center bg-black/30 z-10 rounded-lg p-6 gap-6 border border-white/20 shadow-xl">
        <h1 className="text-5xl text-white drop-shadow-black drop-shadow-xl">Alex Wilson</h1>
        <h2 className="text-3xl text-white drop-shadow-black drop-shadow-xl">Software Developer</h2>

        <div className="flex flex-col gap-2">
          {pages.map((page) => (
            <NavLink
              key={page.url}
              to={page.url}
              className={
                "p-2 rounded-lg bg-black/40 border-white/20 border text-gray-200 hover:border-white/50 transition-all text-2xl hoveranim"
              }
            >
              <span className="drop-shadow-black drop-shadow-xl">{page.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {links.map((link) => (
            <a href={link.url} target="_blank" className="bg-black/50 text-gray-200 p-1 border border-white/20 rounded-lg hover:border-white/50 transition-all hoveranim">
              <FontAwesomeIcon icon={link.Icon} size="2x" className="cursor-pointer drop-shadow-xl drop-shadow-black" /></a>
          ))}
        </div>
      </div>
    </div>
  )
}
