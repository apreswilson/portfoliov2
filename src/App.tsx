import { useEffect, useState } from "react";
import "./App.css";
import TileBackground from "./components/background";
import IntroSection from "./components/sections/intro";
import LinksSection from "./components/sections/links";
import AboutSection from "./components/sections/about";
import ProjectSection from "./components/sections/projects";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const client = navigator.userAgent;
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(client);
    setIsMobile(mobile);
  }, []);

  const [pageView, setPageView] = useState<string>("Home");

  return (
    <>
      <TileBackground />
      <IntroSection isMobile={isMobile} pageView={pageView} setPageView={setPageView} />
      <LinksSection pageView={pageView} setPageView={setPageView} isMobile={isMobile} />
      <AboutSection pageView={pageView} setPageView={setPageView} isMobile={isMobile} />
      <ProjectSection pageView={pageView} setPageView={setPageView} isMobile={isMobile} />
    </>
  );
}
