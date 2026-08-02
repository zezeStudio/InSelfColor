import { useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { FileText, AlertCircle, ShieldAlert, Award, ArrowLeft, Sparkles } from "lucide-react";

interface TermsOfServiceProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  onNavigate: (path: string) => void;
}

export default function TermsOfService({ lang, setLang, onNavigate }: TermsOfServiceProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === "ko"
      ? "서비스 이용약관 및 면책고지 (Terms of Service) | InSelf Color"
      : "Terms of Service | InSelf Color";
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
      {/* Sticky Top Navigation Bar */}
      <HeaderNavbar
        currentRoute="/terms"
        lang={lang}
        setLang={setLang}
        onNavigate={onNavigate}
      />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: "860px",
          width: "100%",
          margin: "40px auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Breadcrumb / Category Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#7A6052",
            marginBottom: "16px",
            fontWeight: 600,
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            style={{ color: "#C4956A", textDecoration: "none" }}
          >
            {lang === "ko" ? "홈" : "Home"}
          </a>
          <span>›</span>
          <span>{lang === "ko" ? "독립 법적 고지" : "Legal Notice"}</span>
          <span>›</span>
          <span style={{ color: "#3E2814" }}>
            {lang === "ko" ? "서비스 이용약관" : "Terms of Service"}
          </span>
        </div>

        {/* Hero Banner Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFF9F3 0%, #F5EAE0 100%)",
            border: "1px solid rgba(196, 149, 106, 0.25)",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px rgba(61, 43, 26, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: "rgba(196, 149, 106, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#A17349",
              }}
            >
              <FileText size={26} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  margin: 0,
                  color: "#3E2814",
                  letterSpacing: "-0.03em",
                }}
              >
                {lang === "ko"
                  ? "서비스 이용약관 및 면책고지 (Terms of Service)"
                  : "Terms of Service"}
              </h1>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#7A6052" }}>
                {lang === "ko"
                  ? "InSelf Color 서비스의 간이 자가진단 이용 조건과 책임 한계에 관한 규정입니다."
                  : "Terms governing simplified self-diagnosis limits and liability disclaimers."}
              </p>
            </div>
          </div>
        </div>

        {/* Core Terms Document Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 149, 106, 0.18)",
            borderRadius: "24px",
            padding: "36px",
            boxShadow: "0 10px 40px rgba(61, 43, 26, 0.03)",
            fontSize: "14.5px",
            lineHeight: "1.8",
            color: "#4A3B32",
          }}
        >
          {lang === "ko" ? (
            <div>
              <p>
                본 이용약관은 <b>InSelf Studio</b>(이하 '회사' 혹은 '운영진')가 무상 배포하는 공적인 <b>InSelf Color(인셀프 컬러)</b> 자가 분석 툴 서비스의 모든 규정과 자가진단에 수반되는 책임 한계를 규율합니다.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AlertCircle size={20} /> 제1조 (기능의 준칙 및 자가진단 도구의 한계성)
              </h2>

              <p>
                본 서비스는 웹 카메라 영상이나 업로드 사진의 픽셀 좌표 컬러 매칭을 모의하는 방식으로 PCCS(Practical Color Coordinate System) 색채 스케일을 분석하는 오락 및 간이 패션 참고 가이드 툴입니다. 이는 실제 오프라인 숙련 오큐페이션 드레이핑 진단의 완전한 법적/의학적 대체가 불가능합니다. 주변 조도, 그림자, 또는 카메라 하드웨어의 보정 성향에 따라 오차가 발생할 수 있습니다.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ShieldAlert size={20} /> 제2조 (의무 면책 및 손실 배상 보호구역)
              </h2>

              <div
                style={{
                  background: "rgba(196, 149, 106, 0.08)",
                  borderLeft: "4px solid #C4956A",
                  borderRadius: "12px",
                  padding: "18px",
                  margin: "16px 0",
                  fontSize: "14.5px",
                  color: "#3E2814",
                }}
              >
                본 진단의 예측 가이드 내용이 절대적 기준이라 판단하여 사용자가 직접 패션, 뷰티 제품, 왁싱, 특수 메이크업 등의 구매 결정을 성사시킨 후 마음에 도달한 가치 격차, 부조화에 관한 <strong>직접적 또는 간접적 금전적 가치 피해에 대하여 회사는 어떠한 법적 분쟁 및 손해에 대한 보상적, 보증 구제 의무도 단행하지 않는 점을 명백히 선언</strong>합니다.
              </div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Award size={20} /> 제3조 (지적재산권 및 자유로운 인용 촉진)
              </h2>

              <p>
                InSelf Color의 결과서나 이미지 다운로드 파일(📸 SNS 카드, 📋 대시보드 리포트 등)은 저작권 보호 및 권리 분쟁 방지 지침에 따라 실존 연예인 등의 성명이나 이미지를 무단으로 도용하지 않으며, 100% 저작권이 확보된 모델 디자인 리소스만을 사용합니다. 따라서 사용자는 개인 블로그, 인스타그램, 티스토리 등에 자유롭게 분석 결과를 재배포하거나 리뷰 콘텐츠로 업로드할 수 있습니다.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText size={20} /> 제4조 (운영진 정보 및 문의)
              </h2>

              <div
                style={{
                  background: "#FAF5EF",
                  borderRadius: "14px",
                  padding: "20px",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                <div><b>• 서비스명:</b> InSelf Color (인셀프 컬러)</div>
                <div><b>• 운영 및 개발:</b> InSelf Studio Labs</div>
                <div><b>• 문의 이메일:</b> <a href="mailto:zezeteam2026@gmail.com" style={{ color: "#C4956A", textDecoration: "underline" }}>zezeteam2026@gmail.com</a></div>
              </div>

              <p style={{ marginTop: "28px", fontSize: "12.5px", color: "#7A6052" }}>
                공표 일자: 2026년 05월 28일
              </p>
            </div>
          ) : (
            <div>
              <p>
                Welcome to <b>InSelf Color</b>. These Terms of Service govern the legal usage limits and the mandatory disclaimer policies for our digital application provided by InSelf Studio.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AlertCircle size={20} /> Article 1 (Purpose & Nature of Simplified Self-Diagnosis)
              </h2>

              <p>
                This service simulates seasonal personal color evaluations based on digital RGB algorithms in reference to the JCRI PCCS scale. It is created purely for entertainment and personal styling reference, and should not be used as an absolute replacement for formal offline clinical color draping analysis.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ShieldAlert size={20} /> Article 2 (Limitation of Liability & Buying Indemnity)
              </h2>

              <div
                style={{
                  background: "rgba(196, 149, 106, 0.08)",
                  borderLeft: "4px solid #C4956A",
                  borderRadius: "12px",
                  padding: "18px",
                  margin: "16px 0",
                  fontSize: "14.5px",
                  color: "#3E2814",
                }}
              >
                Users agree that the output guidelines are recommendation guides only. **InSelf Studio shall not be liable for any direct, indirect, incidental, or psychological dissatisfaction, product mismatch, or monetary losses arising from wardrobe, hair coloring, cosmetics or accessory purchases made based on the results.**
              </div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Award size={20} /> Article 3 (Copyright Clean Licensing Agreement)
              </h2>

              <p>
                All downloadable graphic elements including character portrait files bypass commercial trademarks and celebrity license claims. Any blogger, content creator, or publisher is legally allowed to distribute InSelf Color results and screenshots for blogging, sharing, or reviewing purposes without any intellectual property conflict.
              </p>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#A17349",
                  margin: "32px 0 14px",
                  borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                  paddingBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText size={20} /> Article 4 (Contact Information)
              </h2>

              <div
                style={{
                  background: "#FAF5EF",
                  borderRadius: "14px",
                  padding: "20px",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                <div><b>• Service:</b> InSelf Color</div>
                <div><b>• Provider:</b> InSelf Studio Labs</div>
                <div><b>• Contact Email:</b> <a href="mailto:zezeteam2026@gmail.com" style={{ color: "#C4956A", textDecoration: "underline" }}>zezeteam2026@gmail.com</a></div>
              </div>

              <p style={{ marginTop: "28px", fontSize: "12.5px", color: "#7A6052" }}>
                Published: May 28, 2026
              </p>
            </div>
          )}

          {/* Action Button Section */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(196, 149, 106, 0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #C4956A, #A17349)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "14.5px",
                padding: "14px 28px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(196, 149, 106, 0.25)",
                transition: "transform 0.2s, background-color 0.2s",
              }}
            >
              <ArrowLeft size={18} />
              {lang === "ko" ? "메인 테스트로 돌아가기" : "Back to Main Test"}
            </button>

            <button
              type="button"
              onClick={() => onNavigate("/guide")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(196, 149, 106, 0.12)",
                color: "#A17349",
                fontWeight: 700,
                fontSize: "14px",
                padding: "14px 22px",
                borderRadius: "14px",
                border: "1px solid rgba(196, 149, 106, 0.25)",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <Sparkles size={18} />
              {lang === "ko" ? "PCCS 가이드 보러가기" : "View PCCS Guide"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(122, 96, 82, 0.65)",
          padding: "32px 20px",
          borderTop: "1px solid rgba(196, 149, 106, 0.18)",
          marginTop: "60px",
        }}
      >
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} InSelf Studio. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
