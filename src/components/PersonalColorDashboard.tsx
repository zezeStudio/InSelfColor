import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import {
  Activity,
  ArrowLeft,
  Calendar,
  Download,
  DownloadCloud,
  Eye,
  Globe,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { calculateAnalytics, trackEvent, clearAllStatsLogs, getStatsLogs } from "../utils/stats";

interface PersonalColorDashboardProps {
  onBack: () => void;
  lang: "ko" | "en";
}

export default function PersonalColorDashboard({ onBack, lang }: PersonalColorDashboardProps) {
  const [ticker, setTicker] = useState(0);

  // Recalculate dynamic statistics every time ticker updates
  const analytics = useMemo(() => {
    return calculateAnalytics();
  }, [ticker]);

  const { summary, seasonCounts, genderCounts, dailyTrend, rawLogs } = analytics;

  // Formatted data for charts
  const seasonChartData = useMemo(() => {
    return [
      {
        name: lang === "ko" ? "봄 웜 (Spring)" : "Spring Warm",
        value: seasonCounts.spring,
        color: "#E8AA80", // Peach warm gold
      },
      {
        name: lang === "ko" ? "여름 쿨 (Summer)" : "Summer Cool",
        value: seasonCounts.summer,
        color: "#6FA4CE", // Airy blue
      },
      {
        name: lang === "ko" ? "가을 웜 (Autumn)" : "Autumn Warm",
        value: seasonCounts.autumn,
        color: "#C4956A", // Warm camel brown
      },
      {
        name: lang === "ko" ? "겨울 쿨 (Winter)" : "Winter Cool",
        value: seasonCounts.winter,
        color: "#7E5C8D", // Deep royal purple
      },
    ];
  }, [seasonCounts, lang]);

  const genderChartData = useMemo(() => {
    const total = genderCounts.female + genderCounts.male;
    return [
      {
        name: lang === "ko" ? "여성 스타일 (Female)" : "Female Style",
        value: genderCounts.female,
        percentage: total > 0 ? Math.round((genderCounts.female / total) * 100) : 0,
        color: "#D9A0A0", // Rosy gold
      },
      {
        name: lang === "ko" ? "남성 스타일 (Male)" : "Male Style",
        value: genderCounts.male,
        percentage: total > 0 ? Math.round((genderCounts.male / total) * 100) : 0,
        color: "#6C8A9B", // Cool slate blue
      },
    ];
  }, [genderCounts, lang]);

  const handleClearLogs = () => {
    const confirmMsg =
      lang === "ko"
        ? "정말로 모든 통계 자료를 초기화하시겠습니까? (기본 데이터로 재시작됩니다)"
        : "Are you sure you want to clear all statistical logs? (A clean seed will be generated)";
    if (window.confirm(confirmMsg)) {
      clearAllStatsLogs();
      setTicker((prev) => prev + 1);
    }
  };

  const handleAddRandomTest = () => {
    const seasonsList: ("spring" | "summer" | "autumn" | "winter")[] = ["spring", "summer", "autumn", "winter"];
    const randomSeason = seasonsList[Math.floor(Math.random() * seasonsList.length)];
    const randomGender = Math.random() > 0.4 ? "female" : "male";
    
    // Simulate visit, completed test, gender toggle, and possibly save
    trackEvent("visit", { lang });
    trackEvent("test_complete", { season: randomSeason, gender: randomGender, lang });
    
    if (Math.random() > 0.5) {
      trackEvent("sns_save", { season: randomSeason, gender: randomGender });
    } else if (Math.random() > 0.7) {
      trackEvent("full_save", { season: randomSeason, gender: randomGender });
    }

    setTicker((prev) => prev + 1);
  };

  return (
    <div
      className="min-height-100vh bg-slate-50 text-slate-900 pb-16"
      style={{
        background: "radial-gradient(120% 120% at 50% 10%, #FAF6F0 0%, #FFFFFF 50%, #F5EDE3 100%)",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-orange-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-full hover:bg-amber-100/50 text-amber-900/80 transition-all flex items-center justify-center border border-transparent hover:border-amber-100"
              title={lang === "ko" ? "돌아가기" : "Back"}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold tracking-wider uppercase">
                  Service Dashboard
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-amber-950 mt-1">
                {lang === "ko" ? "InSelf Color 서비스 분석 대시보드" : "InSelf Color Service Analytics"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={handleAddRandomTest}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 font-semibold text-xs text-white shadow-md shadow-orange-700/10 hover:shadow-lg hover:shadow-orange-700/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} />
              {lang === "ko" ? "새 진단 데이터 추가 (+1)" : "Simulate Test Log (+1)"}
            </button>

            <button
              onClick={handleClearLogs}
              className="p-2 rounded-full border border-red-100/80 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
              title={lang === "ko" ? "데이터 초기화" : "Reset Data"}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        {/* KPI METRICS OVERVIEW GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Card 1: Total Visits */}
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-amber-900/5 shadow-sm flex flex-col justify-between hover:border-amber-900/10 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {lang === "ko" ? "누적 웹 방문수" : "Total Visits"}
              </span>
              <div className="p-2 rounded-2xl bg-amber-50 text-amber-700">
                <Globe size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {summary.totalVisits.toLocaleString()}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {lang === "ko" ? "정상 로깅 중" : "Logging Active"}
              </p>
            </div>
          </div>

          {/* Card 2: Total Completed Tests */}
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-amber-900/5 shadow-sm flex flex-col justify-between hover:border-amber-900/10 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {lang === "ko" ? "퍼스널 컬러 진단수" : "Completed Tests"}
              </span>
              <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-700">
                <Activity size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {summary.totalCompletions.toLocaleString()}
              </h3>
              <p className="text-[11px] text-indigo-600 font-semibold mt-1.5">
                {lang === "ko" ? `전환율: ${summary.completionRate}%` : `Conversion: ${summary.completionRate}%`}
              </p>
            </div>
          </div>

          {/* Card 3: SNS Card Downloader */}
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-amber-900/5 shadow-sm flex flex-col justify-between hover:border-amber-900/10 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {lang === "ko" ? "SNS 카드 다운로드" : "SNS Saves"}
              </span>
              <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-700">
                <Download size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {summary.totalSnsSaves.toLocaleString()}
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">
                {lang === "ko" ? `전체 다운로드의 ${Math.round(summary.totalSaves > 0 ? (summary.totalSnsSaves / summary.totalSaves)*100 : 0)}% 차지` : `${Math.round(summary.totalSaves > 0 ? (summary.totalSnsSaves / summary.totalSaves)*100 : 0)}% of saves`}
              </p>
            </div>
          </div>

          {/* Card 4: Full Details Download */}
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-amber-900/5 shadow-sm flex flex-col justify-between hover:border-amber-900/10 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {lang === "ko" ? "전체 결과표 다운로드" : "Detailed Saves"}
              </span>
              <div className="p-2 rounded-2xl bg-rose-50 text-rose-700">
                <DownloadCloud size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {summary.totalFullSaves.toLocaleString()}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {lang === "ko" ? `유저 북마크율: ${summary.saveRate}%` : `Saves/Test: ${summary.saveRate}%`}
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS CONTAINER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section 1: Daily Activity Trend */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-amber-900/5 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-amber-700" size={18} />
                <h4 className="font-bold text-slate-800">
                  {lang === "ko" ? "최근 15일 접속 및 진단 트렌드" : "Daily Activity & Diagnostics (Last 15 Days)"}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-200"></span>{lang === "ko" ? "방문" : "Visits"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>{lang === "ko" ? "완료" : "Completed"}
                </span>
              </div>
            </div>

            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C4956A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#C4956A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7E5C8D" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#7E5C8D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid rgba(196,149,106,0.15)",
                      borderRadius: "14px",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#C4956A"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                    name={lang === "ko" ? "방문수" : "Visits"}
                  />
                  <Area
                    type="monotone"
                    dataKey="completions"
                    stroke="#7E5C8D"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCompletions)"
                    name={lang === "ko" ? "진단완료" : "Tests Completed"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart Section 2: Gender Preferred Style Filter */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-amber-900/5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-amber-700" size={18} />
                <h4 className="font-bold text-slate-800">
                  {lang === "ko" ? "선호 스타일 필터 비율" : "Style Gender Filter Distribution"}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {lang === "ko" ? "결과창에서 소비된 여성 vs 남성 무드 필터 비중" : "Breakdown of Female vs. Male mood filters active"}
              </p>
            </div>

            <div className="w-full h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genderChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "10px",
                      fontSize: "11px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              {genderChartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <div className="font-bold text-slate-800">
                    {item.value} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC & RECENT LOGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Middle: Personal Color Distribution */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-amber-900/5 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-amber-700" size={18} />
                <h4 className="font-bold text-slate-800">
                  {lang === "ko" ? "톤별 진단 비율 통계 (InSelf Trend)" : "Personal Color Season Distribution"}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                {lang === "ko" ? "핵심 마케팅 지표" : "Core North-Star Metrics"}
              </span>
            </div>

            <div className="w-full h-[220px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(196,149,106,0.04)" }}
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "12px",
                      border: "1px solid rgba(196,149,106,0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={34}>
                    {seasonChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {seasonChartData.map((item, i) => {
                const total = seasonChartData.reduce((acc, curr) => acc + curr.value, 0);
                const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                return (
                  <div key={i} className="p-2 bg-slate-50/60 rounded-2xl border border-amber-900/5">
                    <p className="text-[10px] text-slate-500 font-semibold truncate">{item.name.split(" ")[0]}</p>
                    <p className="text-sm font-extrabold mt-1 text-slate-800">{item.value}</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Event Stream */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-amber-900/5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h4 className="font-bold text-slate-800">
                    {lang === "ko" ? "실시간 로그 스트림" : "Real-time Activity Stream"}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setTicker((t) => t + 1)}
                  className="p-1 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-50 cursor-pointer"
                  title={lang === "ko" ? "새로고침" : "Refresh Stream"}
                >
                  <RefreshCw size={13} />
                </button>
              </div>

              {/* Scrollable Log Feed */}
              <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                {rawLogs.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    {lang === "ko" ? "아직 활동 기록이 없습니다." : "No logs available."}
                  </div>
                ) : (
                  rawLogs.map((log, idx) => {
                    const date = new Date(log.timestamp);
                    const timeStr = date.toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    });

                    let typeLabel = "로깅";
                    let typeBg = "bg-slate-100 text-slate-700 border-slate-200";

                    switch (log.type) {
                      case "visit":
                        typeLabel = lang === "ko" ? "사이트 방문" : "Visitor Enter";
                        typeBg = "bg-amber-50 text-amber-800 border-amber-200/50";
                        break;
                      case "test_complete": {
                        let toneText = "";
                        if (log.season === "spring") {
                          toneText = lang === "ko" ? "봄 웜" : "Spring";
                        } else if (log.season === "summer") {
                          toneText = lang === "ko" ? "여름 쿨" : "Summer";
                        } else if (log.season === "autumn") {
                          toneText = lang === "ko" ? "가을 웜" : "Autumn";
                        } else if (log.season === "winter") {
                          toneText = lang === "ko" ? "겨울 쿨" : "Winter";
                        }
                        const genderText = log.gender === "female" ? "♀" : "♂";
                        typeLabel = lang === "ko" ? `진단완료 ✦ ${toneText} ${genderText}` : `Completed ✦ ${toneText} ${genderText}`;
                        typeBg = "bg-indigo-50 text-indigo-800 border-indigo-200/60";
                        break;
                      }
                      case "gender_select":
                        typeLabel = lang === "ko"
                          ? `스타일 성별 변경: ${log.gender === "female" ? "여성" : "남성"}`
                          : `Filter Toggle: ${log.gender === "female" ? "Female" : "Male"}`;
                        typeBg = "bg-pink-50 text-pink-700 border-pink-200/40";
                        break;
                      case "full_save":
                        typeLabel = lang === "ko" ? "📋 전체 결과 이미지 저장" : "📋 Saved Full Content";
                        typeBg = "bg-rose-50 text-rose-800 border-rose-200/50";
                        break;
                      case "sns_save":
                        typeLabel = lang === "ko" ? "📱 SNS 전용 카드 저장" : "📱 Saved SNS Card";
                        typeBg = "bg-emerald-50 text-emerald-800 border-emerald-200/50";
                        break;
                    }

                    return (
                      <div
                        key={idx}
                        className="p-2 border rounded-xl flex items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors"
                        style={{ borderColor: "rgba(196,149,106,0.08)" }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-lg border ${typeBg}`}>
                            {typeLabel}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">{timeStr}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-3 text-center">
              {lang === "ko"
                ? "💡 모의 로그를 추가하여 차트와 분포가 즉시 업데이트되는 모습을 확인하세요!"
                : "💡 Simulate test logs component to see real-time refresh updates."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
