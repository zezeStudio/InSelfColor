import { useState, useEffect } from "react";
import PersonalColorTest from "./components/PersonalColorTest";
import PersonalColorGuide from "./components/PersonalColorGuide";

export default function App() {
  const [path, setPath] = useState<string>(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleNavigate = (newPath: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", newPath);
      setPath(newPath);
    }
  };

  const handleGoToGuide = () => {
    handleNavigate("/guide");
  };

  const handleBackToTest = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      handleNavigate("/");
    }
  };

  return (
    <>
      {path === "/guide" ? (
        <PersonalColorGuide onBack={handleBackToTest} lang={lang} setLang={setLang} />
      ) : (
        <PersonalColorTest
          currentPath={path}
          onNavigate={handleNavigate}
          onGoToGuide={handleGoToGuide}
          lang={lang}
          setLang={setLang}
        />
      )}
    </>
  );
}

