import React from "react";

interface HeaderNavbarProps {
  currentRoute?: string;
  lang: "ko" | "en";
  setLang?: (lang: "ko" | "en") => void;
  onNavigate?: (path: string) => void;
}

export default function HeaderNavbar({
  currentRoute = "/",
  lang,
  setLang,
  onNavigate,
}: HeaderNavbarProps) {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const isHomeActive = currentRoute === "/" || currentRoute === "/upload" || currentRoute === "/results" || currentRoute === "/analyzing";
  const isGuideActive = currentRoute === "/guide" || currentRoute.startsWith("/type");
  const isPrivacyActive = currentRoute === "/privacy" || currentRoute === "/privacy.html";
  const isTermsActive = currentRoute === "/terms" || currentRoute === "/terms.html";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(253, 248, 242, 0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(196, 149, 106, 0.18)",
        boxShadow: "0 4px 20px rgba(61, 43, 26, 0.03)",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNav("/", e)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "900",
            color: "#C4956A",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ fontSize: "22px" }}>✨</span>
          <span>InSelf Color</span>
        </a>

        {/* Navigation Items */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            fontSize: "13.5px",
            fontWeight: "600",
          }}
        >
          <a
            href="/"
            onClick={(e) => handleNav("/", e)}
            style={{
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "100px",
              color: isHomeActive ? "#ffffff" : "#3E2814",
              background: isHomeActive
                ? "linear-gradient(135deg, #C4956A, #A17349)"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "ko" ? "🧪 퍼스널컬러 진단" : "🧪 Diagnosis"}
          </a>

          <a
            href="/guide"
            onClick={(e) => handleNav("/guide", e)}
            style={{
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "100px",
              color: isGuideActive ? "#ffffff" : "#3E2814",
              background: isGuideActive
                ? "linear-gradient(135deg, #C4956A, #A17349)"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "ko" ? "📖 PCCS 가이드" : "📖 PCCS Guide"}
          </a>

          <a
            href="/privacy"
            onClick={(e) => handleNav("/privacy", e)}
            style={{
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "100px",
              color: isPrivacyActive ? "#ffffff" : "#3E2814",
              background: isPrivacyActive
                ? "linear-gradient(135deg, #C4956A, #A17349)"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "ko" ? "🔒 개인정보처리방침" : "🔒 Privacy Policy"}
          </a>

          <a
            href="/terms"
            onClick={(e) => handleNav("/terms", e)}
            style={{
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "100px",
              color: isTermsActive ? "#ffffff" : "#3E2814",
              background: isTermsActive
                ? "linear-gradient(135deg, #C4956A, #A17349)"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "ko" ? "📜 서비스 이용약관" : "📜 Terms of Service"}
          </a>

          {/* Language Selector */}
          {setLang && (
            <button
              type="button"
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              style={{
                marginLeft: "8px",
                padding: "5px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(196, 149, 106, 0.3)",
                background: "rgba(196, 149, 106, 0.08)",
                color: "#7A6052",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={lang === "ko" ? "Switch to English" : "한국어로 변경"}
            >
              🌐 {lang === "ko" ? "EN" : "KO"}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
