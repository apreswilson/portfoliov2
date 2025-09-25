import { useEffect, useState } from "react";
import "./App.css";
import TileBackground from "./components/background";
import IntroSection from "./components/intro/intro";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const client = navigator.userAgent;
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(client);
    setIsMobile(mobile);
  }, []);

  const options = ["About", "Projects", "Links"];
  const [activeOption, setActiveOption] = useState<string>("About");

  const [pageView, setPageView] = useState<string>("Home");
  console.log(pageView);

  return (
    <>
      <TileBackground />
      <IntroSection
        isMobile={isMobile}
        options={options}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        pageView={pageView}
        setPageView={setPageView}
      />
    </>
  );
}
