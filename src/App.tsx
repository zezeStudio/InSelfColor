import { useState, useEffect } from "react";
import PersonalColorTest from "./components/PersonalColorTest";
import PersonalColorGuide from "./components/PersonalColorGuide";
import PersonalColorLongtail, { LONGTAIL_PAGES } from "./components/PersonalColorLongtail";
import GuideArticlePage, { GUIDE_ARTICLES } from "./components/GuideArticlePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoToGuide = () => {
    handleNavigate("/guide");
  };

  const handleBackToTest = () => {
    handleNavigate("/");
  };

  // Normalize path by stripping trailing slashes and .html extensions for routing
  const cleanPath = path.toLowerCase().replace(/\/+$/, "") || "/";
  const pathWithoutHtml = cleanPath.replace(/\.html$/, "");

  // Route 1: About Page
  if (pathWithoutHtml === "/about") {
    return <AboutPage lang={lang} setLang={setLang} onNavigate={handleNavigate} />;
  }

  // Route 2: Contact Page
  if (pathWithoutHtml === "/contact") {
    return <ContactPage lang={lang} setLang={setLang} onNavigate={handleNavigate} />;
  }

  // Route 3: Privacy Policy
  if (pathWithoutHtml === "/privacy") {
    return <PrivacyPolicy lang={lang} setLang={setLang} onNavigate={handleNavigate} />;
  }

  // Route 4: Terms of Service
  if (pathWithoutHtml === "/terms") {
    return <TermsOfService lang={lang} setLang={setLang} onNavigate={handleNavigate} />;
  }

  // Route 5: Column Articles under /guide/...
  if (pathWithoutHtml.startsWith("/guide/")) {
    const articleSlug = pathWithoutHtml.replace("/guide/", "").trim();
    if (articleSlug in GUIDE_ARTICLES) {
      return (
        <GuideArticlePage
          slug={articleSlug}
          lang={lang}
          setLang={setLang}
          onNavigate={handleNavigate}
        />
      );
    }
  }

  // Route 6: Main Personal Color Guide
  if (pathWithoutHtml === "/guide" || pathWithoutHtml === "/personal-color-guide") {
    return <PersonalColorGuide onBack={handleBackToTest} lang={lang} setLang={setLang} />;
  }

  // Route 7: 12 Types Longtail pages (/types/:id, /type/:id, or bare /:id)
  let typeSlug = "";
  if (pathWithoutHtml.startsWith("/types/")) {
    typeSlug = pathWithoutHtml.replace("/types/", "");
  } else if (pathWithoutHtml.startsWith("/type/")) {
    typeSlug = pathWithoutHtml.replace("/type/", "");
  } else if (pathWithoutHtml.startsWith("/")) {
    typeSlug = pathWithoutHtml.substring(1);
  }

  if (typeSlug && typeSlug in LONGTAIL_PAGES) {
    return (
      <PersonalColorLongtail
        pageId={typeSlug}
        onBack={handleBackToTest}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  // Default Route: Personal Color Test (Landing, Upload, Analyzing, Results)
  return (
    <PersonalColorTest
      currentPath={path}
      onNavigate={handleNavigate}
      onGoToGuide={handleGoToGuide}
      lang={lang}
      setLang={setLang}
    />
  );
}
