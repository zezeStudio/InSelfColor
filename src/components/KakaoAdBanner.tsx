import { useEffect, useRef, memo, type CSSProperties } from "react";

export interface KakaoAdBannerProps {
  className?: string;
  unit?: string;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
}

// Global script loader for Kakao AdFit SDK
let scriptLoaderPromise: Promise<void> | null = null;

function loadAdfitSdk(): Promise<void> {
  const win = typeof window !== "undefined" ? (window as unknown as { adfit?: unknown; kakaoAdFit?: unknown }) : null;
  if (win && (win.adfit || win.kakaoAdFit)) {
    return Promise.resolve();
  }
  if (scriptLoaderPromise) {
    return scriptLoaderPromise;
  }

  scriptLoaderPromise = new Promise((resolve) => {
    // Check if script already exists in document
    const existing = document.querySelector('script[src*="/kas/static/ba.min.js"]');
    if (existing) {
      const currentWin = window as unknown as { adfit?: unknown; kakaoAdFit?: unknown };
      if (currentWin.adfit || currentWin.kakaoAdFit) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => resolve());
        setTimeout(resolve, 600);
      }
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return scriptLoaderPromise;
}

/**
 * Kakao AdFit Official Banner Component
 * Handles multiple simultaneous banners (e.g. Left/Right skyscrapers, Top, Middle)
 * and SPA navigation without script conflicts.
 */
export const KakaoAdBanner = memo(function KakaoAdBanner({
  className = "",
  unit = "DAN-EvCbYNj9rO8ZN6jl",
  width = "160",
  height = "600",
  style
}: KakaoAdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let t1: NodeJS.Timeout | null = null;
    let t2: NodeJS.Timeout | null = null;
    let t3: NodeJS.Timeout | null = null;

    // Reset container
    container.innerHTML = "";

    // 1. Create the official ins element
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", unit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));
    container.appendChild(ins);
    insRef.current = ins;

    const renderAd = () => {
      if (!isMounted || !ins) return;
      // If already rendered with iframe or content, avoid duplicate calls
      if (ins.querySelector("iframe")) return;

      try {
        const win = window as unknown as {
          adfit?: {
            (elem?: HTMLElement): void;
            render?: (elem: HTMLElement) => void;
            destroy?: (target: string | HTMLElement) => void;
          };
          kakaoAdFit?: {
            (elem?: HTMLElement): void;
            render?: (elem: HTMLElement) => void;
            destroy?: (target: string | HTMLElement) => void;
          };
        };

        const sdk = win.adfit || win.kakaoAdFit;
        if (sdk) {
          if (typeof sdk.render === "function") {
            sdk.render(ins);
          } else if (typeof sdk === "function") {
            sdk(ins);
          }
        }
      } catch {
        // Ignore render exceptions
      }
    };

    // 2. Load SDK and trigger rendering
    loadAdfitSdk().then(() => {
      if (!isMounted) return;
      renderAd();

      // Ensure render is triggered even if DOM layout settles after mount
      t1 = setTimeout(renderAd, 200);
      t2 = setTimeout(renderAd, 600);
      t3 = setTimeout(renderAd, 1200);
    });

    return () => {
      isMounted = false;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);

      try {
        const win = window as unknown as {
          adfit?: {
            destroy?: (target: string | HTMLElement) => void;
          };
          kakaoAdFit?: {
            destroy?: (target: string | HTMLElement) => void;
          };
        };
        const sdk = win.adfit || win.kakaoAdFit;
        if (sdk && typeof sdk.destroy === "function") {
          if (ins) {
            sdk.destroy(ins);
          } else {
            sdk.destroy(unit);
          }
        }
      } catch {
        // Ignore destroy exceptions
      }

      if (container) {
        container.innerHTML = "";
      }
    };
  }, [unit, width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        ...style
      }}
    />
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

