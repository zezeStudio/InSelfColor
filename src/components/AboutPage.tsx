import { useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { KakaoTopBanner, KakaoMiddleBanner } from "./KakaoAdBanner";
import { Sparkles, Shield, Award, Users, BookOpen, Heart, ArrowRight } from "lucide-react";

interface AboutPageProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  onNavigate: (path: string) => void;
}

export default function AboutPage({ lang, setLang, onNavigate }: AboutPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === "ko" 
      ? "서비스 소개 (About Us) | InSelf Color" 
      : "About Us | InSelf Color";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const descContent = lang === "ko"
      ? "InSelf Color는 PCCS 색채학과 CIE L*a*b* 색공간 모델에 기반한 100% 온디바이스 퍼스널컬러 진단 플랫폼입니다. 개발 배경, 연구진, 색채학적 가치관을 확인하세요."
      : "InSelf Color is a 100% on-device personal color analysis platform engineered on PCCS colorimetry and CIE L*a*b* models. Learn about our mission and scientific foundations.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    }
  }, [lang]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDF8F2",
        color: "#3E2814",
        fontFamily: "'Inter', 'Noto Sans KR', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderNavbar
        currentRoute="/about"
        lang={lang}
        setLang={setLang}
        onNavigate={onNavigate}
      />

      <KakaoTopBanner style={{ margin: "14px 0 0 0" }} />

      <main
        style={{
          flex: 1,
          maxWidth: "860px",
          width: "100%",
          margin: "32px auto 60px",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Breadcrumb Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(196, 149, 106, 0.14)",
              color: "#A17349",
              padding: "5px 14px",
              borderRadius: "100px",
              fontSize: "12.5px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            {lang === "ko" ? "✦ 브랜드 스토리 & 학술 배경" : "✦ Brand Story & Mission"}
          </span>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 900,
              color: "#3E2814",
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
              lineHeight: 1.3,
            }}
          >
            {lang === "ko" ? "나만의 본연의 색을 찾는 여정, InSelf Color" : "Discovering Your True Self Through Color, InSelf Color"}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#7A6052",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {lang === "ko"
              ? "누구에게나 고유하게 어울리는 색채가 있습니다. 과도한 비용 없이 누구나 정확하고 안전하게 나만의 퍼스널컬러를 발견할 수 있도록 디지털 색채학 기술을 구현했습니다."
              : "Everyone possesses their own unique spectrum of colors. We developed a scientific, accessible, and 100% private digital colorimetry solution."}
          </p>
        </div>

        {/* Hero Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.2)",
            padding: "36px 32px",
            boxShadow: "0 8px 30px rgba(61, 43, 26, 0.04)",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Sparkles size={24} color="#C4956A" />
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#3E2814" }}>
              {lang === "ko" ? "1. 서비스 개발 미션 (Our Mission)" : "1. Our Mission"}
            </h2>
          </div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#4A3528", margin: "0 0 16px" }}>
            {lang === "ko" ? (
              <>
                오프라인 퍼스널컬러 컨설팅은 높은 비용과 예약 대기 기간으로 인해 많은 분들이 쉽게 접근하기 어려웠습니다. 또한 조명 상태, 컨설턴트 개인의 주관적 인상에 따라 결과가 달라지는 한계도 있었습니다.<br /><br />
                <strong>InSelf Color (인셀프 컬러)</strong>는 이러한 진입 장벽을 낮추기 위해 <strong>일본 색채 연구소(JCRI)의 PCCS 실용색채계</strong>와 <strong>국제 조명 위원회(CIE) L*a*b* 색 공간 모델</strong>을 소프트웨어 알고리즘으로 모델링했습니다. 사진 한 장으로 누구나 10초 만에 객관적이고 일관된 언더톤·명도·채도 데이터를 직접 측정할 수 있습니다.
              </>
            ) : (
              <>
                Traditional in-person personal color consultations often require high costs, long waits, and may vary based on subjective opinion or lighting. InSelf Color was founded to democratize color science through algorithms based on the JCRI PCCS system and CIE L*a*b* color space, providing consistent and objective analysis in seconds.
              </>
            )}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                background: "#FAF5EF",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(196, 149, 106, 0.15)",
              }}
            >
              <Award size={20} color="#C4956A" style={{ marginBottom: "8px" }} />
              <div style={{ fontWeight: 800, fontSize: "14px", marginBottom: "6px" }}>
                {lang === "ko" ? "학술적 객관성" : "Academic Rigor"}
              </div>
              <div style={{ fontSize: "12.5px", color: "#7A6052", lineHeight: 1.6 }}>
                {lang === "ko"
                  ? "PCCS 24색상환 및 12톤 체계, Munsell HVC 규격(KS A 0062)을 기반으로 정밀 수치화"
                  : "Calibrated to PCCS 24-hue wheel, 12 tones, and Munsell HVC standard metrics"}
              </div>
            </div>

            <div
              style={{
                background: "#FAF5EF",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(196, 149, 106, 0.15)",
              }}
            >
              <Shield size={20} color="#C4956A" style={{ marginBottom: "8px" }} />
              <div style={{ fontWeight: 800, fontSize: "14px", marginBottom: "6px" }}>
                {lang === "ko" ? "100% 프라이버시 보호" : "100% On-Device Privacy"}
              </div>
              <div style={{ fontSize: "12.5px", color: "#7A6052", lineHeight: 1.6 }}>
                {lang === "ko"
                  ? "업로드된 얼굴 사진은 외부 서버로 전송되지 않으며 브라우저 메모리 안에서만 처리 후 즉시 파기"
                  : "Photos are processed entirely inside browser client RAM with zero external server storage"}
              </div>
            </div>

            <div
              style={{
                background: "#FAF5EF",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(196, 149, 106, 0.15)",
              }}
            >
              <Users size={20} color="#C4956A" style={{ marginBottom: "8px" }} />
              <div style={{ fontWeight: 800, fontSize: "14px", marginBottom: "6px" }}>
                {lang === "ko" ? "누구나 무료 이용" : "Free & Accessible"}
              </div>
              <div style={{ fontSize: "12.5px", color: "#7A6052", lineHeight: 1.6 }}>
                {lang === "ko"
                  ? "회원가입, 유료 결제 없이 모든 진단 결과와 12타입 상세 스타일링 가이드를 자유롭게 열람"
                  : "Free for everyone without logins or paywalls, including full 12-type styling guidebooks"}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Banner */}
        <KakaoMiddleBanner style={{ margin: "24px 0" }} />

        {/* Research Team Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.2)",
            padding: "36px 32px",
            boxShadow: "0 8px 30px rgba(61, 43, 26, 0.04)",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <BookOpen size={24} color="#C4956A" />
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#3E2814" }}>
              {lang === "ko" ? "2. 연구 개발팀 (InSelf Studio Labs)" : "2. InSelf Studio Labs"}
            </h2>
          </div>

          <p style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#4A3528", margin: "0 0 20px" }}>
            {lang === "ko" ? (
              <>
                InSelf Color는 디지털 이미징 엔지니어, 색채학 연구원, 프론트엔드 아키텍트로 구성된 <strong>InSelf Studio Labs</strong>에서 연구·제작되었습니다.
                인체 피부의 멜라닌(Melanin)과 헤모글로빈(Hemoglobin) 흡광 스펙트럼 데이터를 디지털 RGB 및 Lab 공간 좌표로 역추적하는 광학 알고리즘을 개발하여, 조명 환경 편차를 보정하고 안정적인 진단 결과를 제공합니다.
              </>
            ) : (
              <>
                Engineered by InSelf Studio Labs, a collaborative team of digital imaging researchers, colorists, and software engineers. We developed spectral optical models estimating melanin and hemoglobin reflectance within RGB and CIE L*a*b* coordinates.
              </>
            )}
          </p>

          <div
            style={{
              background: "#FAF5EF",
              borderRadius: "14px",
              padding: "20px",
              fontSize: "13.5px",
              lineHeight: 1.8,
            }}
          >
            <div><b>• 운영 주체:</b> InSelf Studio Labs</div>
            <div><b>• 핵심 기술:</b> JCRI PCCS 매핑, CIE L*a*b* 색차 분석(ΔE*ab), 클라이언트 Canvas 픽셀 처리 엔진</div>
            <div><b>• 학술 인용:</b> 일본 색채 연구소 PCCS(1964), 한국 공업 규격(KS A 0062), 국제 조명 위원회 CIE 1976</div>
            <div><b>• 공식 연락처:</b> <a href="mailto:rudcjf11@nate.com" style={{ color: "#C4956A", textDecoration: "underline" }}>rudcjf11@nate.com</a></div>
          </div>
        </div>

        {/* CTA Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #FAF5EF, #F0E6D8)",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.3)",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <Heart size={28} color="#C4956A" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 10px", color: "#3E2814" }}>
            {lang === "ko" ? "지금 나만의 색을 발견해보세요" : "Find Your Signature Colors Now"}
          </h3>
          <p style={{ fontSize: "14px", color: "#7A6052", margin: "0 0 20px" }}>
            {lang === "ko"
              ? "정면 얼굴 사진 한 장으로 10초 만에 퍼스널 컬러 진단을 시작할 수 있습니다."
              : "Upload a selfie and get your personalized 12-season color report in 10 seconds."}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #C4956A, #A17349)",
                color: "#ffffff",
                border: "none",
                borderRadius: "100px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(196, 149, 106, 0.4)",
              }}
            >
              <span>{lang === "ko" ? "📸 퍼스널컬러 진단 시작" : "📸 Start Color Test"}</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate("/guide")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#3E2814",
                border: "1px solid rgba(196, 149, 106, 0.3)",
                borderRadius: "100px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span>{lang === "ko" ? "📖 PCCS 색채 가이드" : "📖 PCCS Color Guide"}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(196, 149, 106, 0.15)",
          padding: "24px 20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#7A6052",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "8px" }}>
          <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate("/about"); }} style={{ color: "#C4956A", fontWeight: 700, textDecoration: "none" }}>{lang === "ko" ? "서비스 소개" : "About"}</a>
          <span>•</span>
          <a href="/guide" onClick={(e) => { e.preventDefault(); onNavigate("/guide"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "PCCS 가이드" : "PCCS Guide"}</a>
          <span>•</span>
          <a href="/privacy" onClick={(e) => { e.preventDefault(); onNavigate("/privacy"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}</a>
          <span>•</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate("/terms"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "이용약관" : "Terms"}</a>
          <span>•</span>
          <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate("/contact"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "문의하기" : "Contact"}</a>
        </div>
        <div>© {new Date().getFullYear()} InSelf Studio Labs. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
