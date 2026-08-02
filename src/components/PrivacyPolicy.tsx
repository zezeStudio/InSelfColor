import { useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { ShieldCheck, Lock, EyeOff, FileText, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

interface PrivacyPolicyProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  onNavigate: (path: string) => void;
}

export default function PrivacyPolicy({ lang, setLang, onNavigate }: PrivacyPolicyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === "ko"
      ? "개인정보처리방침 (Privacy Policy) | InSelf Color"
      : "Privacy Policy | InSelf Color";
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
        currentRoute="/privacy"
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
            {lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}
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
              <ShieldCheck size={26} />
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
                {lang === "ko" ? "개인정보처리방침 (Privacy Policy)" : "Privacy Policy"}
              </h1>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#7A6052" }}>
                {lang === "ko"
                  ? "InSelf Color는 사용자의 프라이버시 보호와 100% 클라이언트 로컬 분석을 보증합니다."
                  : "InSelf Color guarantees strict client-side privacy protection with zero server uploads."}
              </p>
            </div>
          </div>
        </div>

        {/* Core Policy Document Card */}
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
                본 성문화된 개인정보처리방침은 <b>InSelf Color(인셀프 컬러)</b> 자가진단 분석 서비스가 사용자의 프라이버시를 어떠한 절차로 철저하게 수호하고 법적 기준인 개인정보보호법을 준수하는지 투명하게 선언합니다.
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
                <Lock size={20} /> 1. 개인정보 미수집 및 서버 비저장 선언 (Client-Side Only)
              </h2>

              <div
                style={{
                  background: "rgba(196, 149, 106, 0.08)",
                  borderLeft: "4px solid #C4956A",
                  borderRadius: "12px",
                  padding: "18px",
                  margin: "16px 0",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "#3E2814",
                }}
              >
                ★ 중요 고지: 본 서비스(InSelf Color)는 사용자가 기기에서 업로드하거나 촬영한 원본 얼굴 사진, 픽셀 데이터, 안면 특징점 이미지 데이터를 외부의 어떠한 데이터베이스 웹서버로도 전송, 저장 혹은 영구 수집하지 않습니다.
              </div>

              <p>
                모든 픽셀 정보 추출 및 안면 영역 연산, 퍼스널 컬러 진단 매칭을 비롯한 시각 그래픽 생성을 위한 알고리즘은 <strong>사용자의 디바이스 및 웹 브라우저 로컬 환경(Client-side Web Canvas)의 임시 메모리 내에서만 100% 일시적으로 구동되고 완전히 소멸</strong>됩니다. 사용자가 진단 윈도우를 이탈하거나 새로고침을 누르시는 즉시 캐시는 흔적 없이 영구 폐기됨을 보증합니다.
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
                <EyeOff size={20} /> 2. 구글 애드센스 및 제3자 광고 사업자 쿠키 사용 고지
              </h2>

              <p>
                본 사이트는 구글 애드센스(Google AdSense)를 통한 타겟 맞춤형 온라인 디스플레이 광고를 탑재할 수 있습니다. 이를 분석하고 맞춤 제품을 제공하기 위해 귀하의 웹브라우저에 쿠키(Cookie) 데이터를 설정하거나 조회할 수 있습니다.
              </p>

              <ul style={{ paddingLeft: "22px", margin: "12px 0 20px" }}>
                <li style={{ marginBottom: "8px" }}>
                  <strong>쿠키의 역할:</strong> 구글은 당사 사이트나 기타 타 웹사이트의 과거 트래픽 방문 기법을 바탕으로 사용자 맞춤 광고를 제3자 광고 제휴 네트워크를 통해 송출합니다.
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>거부 방법 설정:</strong> 사용자는 언제든지 웹브라우저의 메뉴 항목(예: Chrome 환경 설정 - 개인정보 및 보안 - 쿠키 메뉴)에서 개별적으로 타사 쿠키 허용 전면 차단 등을 조작해 차단할 수 있습니다.
                </li>
              </ul>

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
                <FileText size={20} /> 3. 문의처 및 개인정보 보호 책임 정보
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
                <div><b>• 개인정보관리책임:</b> InSelf Privacy Officer</div>
                <div><b>• 문의 이메일:</b> <a href="mailto:zezeteam2026@gmail.com" style={{ color: "#C4956A", textDecoration: "underline" }}>zezeteam2026@gmail.com</a></div>
              </div>

              <p style={{ marginTop: "28px", fontSize: "12.5px", color: "#7A6052" }}>
                공표 일자: 2026년 05월 28일 (본 정책은 공시 당일부터 전면 적용됩니다.)
              </p>
            </div>
          ) : (
            <div>
              <p>
                This formulated Privacy Policy explicitly describes how <b>InSelf Color</b> safeguards and handles your privacy and credentials in strict compliance with globally recognized privacy frameworks and search advisor doctrines.
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
                <Lock size={20} /> 1. Absolute Zero-Server Transfer Doctrine (Client-Side Execution)
              </h2>

              <div
                style={{
                  background: "rgba(196, 149, 106, 0.08)",
                  borderLeft: "4px solid #C4956A",
                  borderRadius: "12px",
                  padding: "18px",
                  margin: "16px 0",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "#3E2814",
                }}
              >
                ★ NOTICE: InSelf Color completely rejects uploading, transferring, or hosting your photos or any biometric representations on any visual database or external remote servers.
              </div>

              <p>
                All calculations for coordinate reading, RGB skin detection, and instant styling card generator scripts execute entirely on the <strong>Client-side Canvas inside your web browser</strong>. The temporary memory is erased completely when you reload, back trace, or close the page.
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
                <EyeOff size={20} /> 2. Google AdSense Personalized Ads Advertising Cookie Notice
              </h2>

              <p>
                Third-party marketing vendors, premium analytics systems, and Google AdSense utilize persistent and session Cookies on your local browser cache to display dynamic target ads based on custom traffic patterns.
              </p>

              <ul style={{ paddingLeft: "22px", margin: "12px 0 20px" }}>
                <li style={{ marginBottom: "8px" }}>
                  Google's use of advertising cookies enables it and its affiliates to serve ads based on your specific digital journey across the internet.
                </li>
                <li style={{ marginBottom: "8px" }}>
                  You possess the fundamental legal right to decline personalized advertising by adjusting your own cookie blocking tools within browser preferences.
                </li>
              </ul>

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
                <FileText size={20} /> 3. Contact & Privacy Information
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
                Effective Date: May 28, 2026 (Published under immediate effect.)
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
