import { useEffect, useRef, useState, memo, type CSSProperties } from "react";

export interface KakaoAdBannerProps {
  className?: string;
  unit?: string;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
}

/**
 * Kakao AdFit Official Banner Component
 * Implements the standard React/Next.js dynamic <ins> + <script> insertion pattern
 * directly into the document DOM without iframes.
 */
export const KakaoAdBanner = memo(function KakaoAdBanner({
  className = "",
  unit = "DAN-keG6pMHM3YLMdQa4",
  width = "320",
  height = "50",
  style
}: KakaoAdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDev, setIsDev] = useState<boolean>(false);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);

  const w = String(width);
  const h = String(height);

  useEffect(() => {
    // Detect preview / development environment
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      const devEnvironment = host === "localhost" || host === "127.0.0.1" || host.includes("run.app");
      setIsDev(devEnvironment);
    }

    const container = containerRef.current;
    if (!container) return;

    // Reset container contents to prevent duplicate ad elements on route change
    container.innerHTML = "";

    // 1. Create official Kakao AdFit <ins> element
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", unit);
    ins.setAttribute("data-ad-width", w);
    ins.setAttribute("data-ad-height", h);

    // 2. Create official Kakao AdFit script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
    script.charset = "utf-8";
    script.async = true;

    script.onload = () => {
      setAdLoaded(true);
    };

    container.appendChild(ins);
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [unit, w, h]);

  return (
    <div
      className={`kakao-ad-wrapper ${className}`}
      style={{
        width: `${w}px`,
        minHeight: `${h}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        position: "relative",
        boxSizing: "border-box",
        ...style
      }}
    >
      {/* Real Kakao AdFit Target */}
      <div
        ref={containerRef}
        style={{
          width: `${w}px`,
          minHeight: `${h}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      />

      {/* Development Environment Visual Indicator (Only visible in localhost / dev preview) */}
      {isDev && (
        <div
          style={{
            width: "100%",
            padding: "4px 8px",
            background: "rgba(254, 229, 0, 0.15)",
            border: "1px dashed rgba(254, 229, 0, 0.6)",
            borderRadius: "6px",
            fontSize: "10.5px",
            color: "#4A3B12",
            textAlign: "center",
            marginTop: "2px",
            lineHeight: "1.4"
          }}
        >
          🟡 <b>AdFit 광고 영역 ({w}×{h})</b>: <code>{unit}</code>
          <div style={{ fontSize: "9.5px", color: "rgba(74, 59, 18, 0.75)" }}>
            ※ 카카오 애드핏은 등록 도메인(inselfcolor.pages.dev) 배포 시 실시간 광고가 송출됩니다.
          </div>
        </div>
      )}
    </div>
  );
});

/**
 * 320x50 Top Page Banner (DAN-keG6pMHM3YLMdQa4)
 * Placed at the top of each page
 */
export const KakaoTopBanner = memo(function KakaoTopBanner({
  className = "",
  style
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`pct-ad-top-wrapper ${className}`}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "12px 0 16px 0",
        minHeight: "50px",
        overflow: "hidden",
        ...style
      }}
    >
      <KakaoAdBanner
        unit="DAN-keG6pMHM3YLMdQa4"
        width="320"
        height="50"
      />
    </div>
  );
});

/**
 * 300x250 Middle Page Banner (DAN-yIR46FWNSqGqGUfK)
 * Placed in the middle of each page
 */
export const KakaoMiddleBanner = memo(function KakaoMiddleBanner({
  className = "",
  style
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`pct-ad-middle-wrapper ${className}`}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "24px 0",
        minHeight: "250px",
        overflow: "hidden",
        ...style
      }}
    >
      <KakaoAdBanner
        unit="DAN-yIR46FWNSqGqGUfK"
        width="300"
        height="250"
      />
    </div>
  );
});

export default KakaoAdBanner;
