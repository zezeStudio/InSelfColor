import { useState, useEffect, type FormEvent } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { KakaoTopBanner, KakaoMiddleBanner } from "./KakaoAdBanner";
import { Mail, MessageSquare, Clock, ShieldCheck, CheckCircle2, Send, AlertCircle, Copy, Check } from "lucide-react";

interface ContactPageProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  onNavigate: (path: string) => void;
}

export default function ContactPage({ lang, setLang, onNavigate }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("zezeteam2026@gmail.com").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === "ko" 
      ? "문의하기 & 고객 지원 (Contact Us) | InSelf Color" 
      : "Contact Us & Support | InSelf Color";

    let metaDesc = document.querySelector('meta[name="description"]');
    const descContent = lang === "ko"
      ? "InSelf Color 제휴, 기술 자문, 학술 피드백, 서비스 오류 신고를 위한 공식 문의 센터입니다. 24~48시간 이내에 성심껏 답변드립니다."
      : "Official contact center for InSelf Color. Partnerships, colorimetry inquiries, technical feedback, and customer support.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    }
  }, [lang]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg(lang === "ko" ? "성함 또는 닉네임을 입력해 주세요." : "Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(lang === "ko" ? "올바른 이메일 주소를 입력해 주세요." : "Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg(lang === "ko" ? "문의 내용을 입력해 주세요." : "Please enter your message.");
      return;
    }

    // Try mailto fallback or simulated success
    const mailtoUrl = `mailto:zezeteam2026@gmail.com?subject=${encodeURIComponent(`[InSelf Color 문의 - ${category}] ${subject || name}`)}&body=${encodeURIComponent(`보낸이: ${name} (${email})\n문의 분류: ${category}\n\n내용:\n${message}`)}`;
    
    // We display success screen, and open mailto link if user wants
    setIsSubmitted(true);
    window.location.href = mailtoUrl;
  };

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
        currentRoute="/contact"
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
            {lang === "ko" ? "✦ 고객 지원 & 공식 제휴" : "✦ Support & Partnerships"}
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
            {lang === "ko" ? "무엇을 도와드릴까요? (Contact Us)" : "How Can We Help You? (Contact Us)"}
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
              ? "서비스 이용 중 불편한 점, 기능 제안, 기업/브랜드 제휴, 학술 자문 등 어떤 의견이든 환영합니다."
              : "Whether you have questions, partnership inquiries, bug reports, or feature requests, we are here to help."}
          </p>
        </div>

        {/* Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid rgba(196, 149, 106, 0.2)",
              padding: "24px",
              boxShadow: "0 6px 20px rgba(61, 43, 26, 0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(196, 149, 106, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C4956A",
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#7A6052", fontWeight: 600 }}>
                  {lang === "ko" ? "공식 이메일" : "Official Email"}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#3E2814", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>zezeteam2026@gmail.com</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title={lang === "ko" ? "이메일 복사" : "Copy email"}
                    style={{
                      background: copiedEmail ? "rgba(5, 150, 105, 0.12)" : "rgba(196, 149, 106, 0.14)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "3px 6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      color: copiedEmail ? "#059669" : "#8A5B36",
                      fontWeight: 600,
                    }}
                  >
                    {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                    {copiedEmail ? (lang === "ko" ? "복사됨" : "Copied") : (lang === "ko" ? "복사" : "Copy")}
                  </button>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "#7A6052", margin: 0, lineHeight: 1.6 }}>
              {lang === "ko"
                ? "모든 공식 문서, 제휴 제안서 및 대용량 파일은 공식 이메일로 발송해 주시면 검토 후 답변드립니다."
                : "Send proposals, partnership decks, or inquiries directly to our team inbox."}
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid rgba(196, 149, 106, 0.2)",
              padding: "24px",
              boxShadow: "0 6px 20px rgba(61, 43, 26, 0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(196, 149, 106, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C4956A",
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#7A6052", fontWeight: 600 }}>
                  {lang === "ko" ? "회신 소요 시간" : "Response Time"}
                </div>
                <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#3E2814" }}>
                  {lang === "ko" ? "평일 24~48시간 이내" : "Within 24-48 Hours"}
                </div>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "#7A6052", margin: 0, lineHeight: 1.6 }}>
              {lang === "ko"
                ? "영업일(월~금, 공휴일 제외) 기준 순차적으로 신속하게 회신해 드리고 있습니다."
                : "We review and respond to each message during business hours (Mon-Fri)."}
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.2)",
            padding: "36px 32px",
            boxShadow: "0 8px 30px rgba(61, 43, 26, 0.04)",
          }}
        >
          {isSubmitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <CheckCircle2 size={56} color="#059669" style={{ margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#3E2814", marginBottom: "10px" }}>
                {lang === "ko" ? "문의가 성공적으로 전달되었습니다!" : "Message Sent Successfully!"}
              </h2>
              <p style={{ fontSize: "14.5px", color: "#7A6052", maxWidth: "500px", margin: "0 auto 24px", lineHeight: 1.7 }}>
                {lang === "ko"
                  ? "작성해 주신 소중한 내용은 담당자에게 전달되었으며, 기재해 주신 이메일로 24~48시간 이내에 답변을 드리겠습니다."
                  : "Thank you for reaching out! We have received your inquiry and will respond to your email within 24-48 hours."}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: copiedEmail ? "rgba(5, 150, 105, 0.12)" : "rgba(196, 149, 106, 0.12)",
                    color: copiedEmail ? "#059669" : "#8A5B36",
                    border: "1px solid rgba(196, 149, 106, 0.25)",
                    borderRadius: "100px",
                    padding: "9px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  {copiedEmail ? (lang === "ko" ? "이메일 복사 완료!" : "Email Copied!") : (lang === "ko" ? "공식 이메일 복사" : "Copy Official Email")}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
                style={{
                  background: "linear-gradient(135deg, #C4956A, #A17349)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "100px",
                  padding: "10px 24px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {lang === "ko" ? "추가 문의 작성하기" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <MessageSquare size={22} color="#C4956A" />
                <h2 style={{ fontSize: "19px", fontWeight: 800, margin: 0, color: "#3E2814" }}>
                  {lang === "ko" ? "온라인 문의 접수" : "Online Inquiry Form"}
                </h2>
              </div>

              {errorMsg && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#DC2626",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    fontSize: "13px",
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#4A3528" }}>
                    {lang === "ko" ? "성함 / 담당자명" : "Your Name"} <span style={{ color: "#E06D53" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "ko" ? "홍길동" : "Jane Doe"}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid rgba(196, 149, 106, 0.3)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      backgroundColor: "#FAF6F1",
                      color: "#3E2814",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#4A3528" }}>
                    {lang === "ko" ? "답변 받으실 이메일" : "Your Email"} <span style={{ color: "#E06D53" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid rgba(196, 149, 106, 0.3)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      backgroundColor: "#FAF6F1",
                      color: "#3E2814",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#4A3528" }}>
                  {lang === "ko" ? "문의 유형" : "Inquiry Category"}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(196, 149, 106, 0.3)",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "#FAF6F1",
                    color: "#3E2814",
                  }}
                >
                  <option value="general">{lang === "ko" ? "일반 문의 & 사용법" : "General Inquiry"}</option>
                  <option value="partnership">{lang === "ko" ? "브랜드 / 기업 제휴 및 광고" : "Brand / Business Partnership"}</option>
                  <option value="colorimetry">{lang === "ko" ? "색채학 & 학술 자문 피드백" : "Colorimetry / Academic Feedback"}</option>
                  <option value="bug">{lang === "ko" ? "서비스 오류 및 버그 신고" : "Bug & Issue Report"}</option>
                  <option value="privacy">{lang === "ko" ? "개인정보 & 프라이버시 문의" : "Privacy & Data Protection"}</option>
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#4A3528" }}>
                  {lang === "ko" ? "제목" : "Subject"}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={lang === "ko" ? "문의 제목을 입력하세요" : "Summary of your inquiry"}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(196, 149, 106, 0.3)",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "#FAF6F1",
                    color: "#3E2814",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#4A3528" }}>
                  {lang === "ko" ? "문의 내용" : "Message"} <span style={{ color: "#E06D53" }}>*</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === "ko"
                      ? "자세한 문의 사항을 남겨주시면 더욱 정확한 답변을 드릴 수 있습니다."
                      : "Please provide detailed information so we can assist you better."
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(196, 149, 106, 0.3)",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "#FAF6F1",
                    color: "#3E2814",
                    lineHeight: 1.6,
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  background: "linear-gradient(135deg, #C4956A, #A17349)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(196, 149, 106, 0.35)",
                }}
              >
                <Send size={18} />
                <span>{lang === "ko" ? "문의 보내기" : "Send Inquiry"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Middle Banner */}
        <KakaoMiddleBanner style={{ margin: "28px 0" }} />
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
          <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate("/about"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "서비스 소개" : "About"}</a>
          <span>•</span>
          <a href="/guide" onClick={(e) => { e.preventDefault(); onNavigate("/guide"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "PCCS 가이드" : "PCCS Guide"}</a>
          <span>•</span>
          <a href="/privacy" onClick={(e) => { e.preventDefault(); onNavigate("/privacy"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}</a>
          <span>•</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate("/terms"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "이용약관" : "Terms"}</a>
          <span>•</span>
          <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate("/contact"); }} style={{ color: "#C4956A", fontWeight: 700, textDecoration: "none" }}>{lang === "ko" ? "문의하기" : "Contact"}</a>
        </div>
        <div>© {new Date().getFullYear()} InSelf Studio Labs. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
