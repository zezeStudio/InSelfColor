import { useState, useEffect } from "react";
import PersonalColorTest from "./components/PersonalColorTest";
import PersonalColorGuide from "./components/PersonalColorGuide";

export default function App() {
  const [view, setView] = useState<"test" | "guide">(
    typeof window !== "undefined" && window.location.hash === "#guide" ? "guide" : "test"
  );
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash === "#guide") {
        setView("guide");
      } else {
        setView("test");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleGoToGuide = () => {
    window.history.pushState({ view: "guide" }, "", "#guide");
    setView("guide");
  };

  const handleBackToTest = () => {
    if (window.location.hash === "#guide") {
      window.history.back();
    } else {
      setView("test");
    }
  };

  return (
    <>
      {view === "test" ? (
        <PersonalColorTest onGoToGuide={handleGoToGuide} lang={lang} setLang={setLang} />
      ) : (
        <PersonalColorGuide onBack={handleBackToTest} lang={lang} setLang={setLang} />
      )}
    </>
  );
}

