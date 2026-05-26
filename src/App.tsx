import { useState, useEffect } from "react";
import PersonalColorTest from "./components/PersonalColorTest";
import PersonalColorGuide from "./components/PersonalColorGuide";
import PersonalColorDashboard from "./components/PersonalColorDashboard";

export default function App() {
  const [view, setView] = useState<"test" | "guide" | "admin">(
    typeof window !== "undefined" && window.location.hash === "#admin"
      ? "admin"
      : typeof window !== "undefined" && window.location.hash === "#guide"
      ? "guide"
      : "test"
  );
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === "#admin") {
        setView("admin");
      } else if (hash === "#guide") {
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

  const handleGoToAdmin = () => {
    window.history.pushState({ view: "admin" }, "", "#admin");
    setView("admin");
  };

  const handleBackToTest = () => {
    const hash = window.location.hash;
    if (hash === "#guide" || hash === "#admin") {
      window.history.back();
    } else {
      setView("test");
    }
  };

  return (
    <>
      {view === "test" && (
        <PersonalColorTest onGoToGuide={handleGoToGuide} onGoToDashboard={handleGoToAdmin} lang={lang} setLang={setLang} />
      )}
      {view === "guide" && (
        <PersonalColorGuide onBack={handleBackToTest} lang={lang} setLang={setLang} />
      )}
      {view === "admin" && (
        <PersonalColorDashboard onBack={handleBackToTest} lang={lang} />
      )}
    </>
  );
}

