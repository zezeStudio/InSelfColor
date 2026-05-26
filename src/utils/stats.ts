/**
 * InSelf Color Analytics & Stats Utilities
 * Persistent client-side statistics tracker with simulated historical seed data
 */

export interface StatLog {
  timestamp: string; // ISO String
  type: "visit" | "test_complete" | "gender_select" | "sns_save" | "full_save" | "repr_save";
  season?: "spring" | "summer" | "autumn" | "winter";
  gender?: "female" | "male";
  lang?: "ko" | "en";
}

const STORAGE_KEY = "inself_color_stats_logs_v1";

// Simple feedback loop to prevent double counting visits in a single session
const SESSION_VISIT_KEY = "inself_color_visited_session";

// Seeds realistic historical logs for the past 15 days if empty
function generateSeedData(currentDateStr: string): StatLog[] {
  const seededLogs: StatLog[] = [];
  const baseDate = new Date(currentDateStr);
  const seasons: ("spring" | "summer" | "autumn" | "winter")[] = ["spring", "summer", "autumn", "winter"];
  
  // Weights: Summer Cool (~40%), Autumn Warm (~28%), Spring Warm (~20%), Winter Cool (~12%)
  const seasonWeights = [0.20, 0.40, 0.28, 0.12];
  
  // Language weight: Ko (85%), En (15%)
  
  const getRandomSeason = (): "spring" | "summer" | "autumn" | "winter" => {
    const r = Math.random();
    if (r < seasonWeights[0]) return seasons[0];
    if (r < seasonWeights[0] + seasonWeights[1]) return seasons[1];
    if (r < seasonWeights[0] + seasonWeights[1] + seasonWeights[2]) return seasons[2];
    return seasons[3];
  };

  // Seed data over 15 days
  for (let i = 15; i >= 0; i--) {
    const day = new Date(baseDate.getTime());
    day.setDate(baseDate.getDate() - i);
    
    // Day variance (weekends have higher traffic)
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const countMultiplier = isWeekend ? 1.4 : 1.0;
    
    // 1. Visits: 30 - 70 standard
    const totalVisits = Math.floor((30 + Math.random() * 40) * countMultiplier);
    
    for (let v = 0; v < totalVisits; v++) {
      // Visit hour
      const hour = Math.floor(Math.random() * 24);
      const min = Math.floor(Math.random() * 60);
      const timestamp = new Date(day.getTime());
      timestamp.setHours(hour, min, Math.floor(Math.random() * 60));
      
      seededLogs.push({
        timestamp: timestamp.toISOString(),
        type: "visit",
        lang: Math.random() > 0.15 ? "ko" : "en",
      });
    }

    // 2. Tests completed: typically 40~60% of visits convert to a completed test
    const testCount = Math.floor(totalVisits * (0.4 + Math.random() * 0.2));
    for (let t = 0; t < testCount; t++) {
      const hour = Math.floor(Math.random() * 24);
      const min = Math.floor(Math.random() * 60);
      const timestamp = new Date(day.getTime());
      timestamp.setHours(hour, min, Math.floor(Math.random() * 60));
      
      const gender = Math.random() > 0.35 ? "female" : "male"; // 65% female preference for tests
      const season = getRandomSeason();
      
      seededLogs.push({
        timestamp: timestamp.toISOString(),
        type: "test_complete",
        gender,
        season,
        lang: Math.random() > 0.15 ? "ko" : "en",
      });

      // 3. Gender toggle events during results: ~1.5 per test as user explores styles
      const genderToggles = Math.floor(Math.random() * 3);
      for (let g = 0; g < genderToggles; g++) {
        const toggleTime = new Date(timestamp.getTime() + (Math.random() * 5 * 60 * 1000));
        seededLogs.push({
          timestamp: toggleTime.toISOString(),
          type: "gender_select",
          gender: Math.random() > 0.5 ? "female" : "male",
        });
      }

      // 4. Save events (High-value core action)
      // Save Detailed: ~20% of completions
      if (Math.random() < 0.22) {
        const saveTime = new Date(timestamp.getTime() + (Math.random() * 4 * 60 * 1000));
        seededLogs.push({
          timestamp: saveTime.toISOString(),
          type: "full_save",
          gender,
          season,
        });
      }

      // Save SNS Widget Card: ~28% of completions
      if (Math.random() < 0.30) {
        const saveTime = new Date(timestamp.getTime() + (Math.random() * 4 * 60 * 1000));
        seededLogs.push({
          timestamp: saveTime.toISOString(),
          type: "sns_save",
          gender,
          season,
        });
      }
    }
  }

  // Sort by timestamp ascending
  seededLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  return seededLogs;
}

export function getStatsLogs(): StatLog[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fallback
    }
  }
  
  // If empty, generate seed and save it
  const seed = generateSeedData(new Date().toISOString());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export function saveStatsLogs(logs: StatLog[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

// Global hook of logging helpers
export const trackEvent = (
  type: StatLog["type"],
  data?: { season?: StatLog["season"]; gender?: StatLog["gender"]; lang?: StatLog["lang"] }
) => {
  if (typeof window === "undefined") return;
  const logs = getStatsLogs();
  const entry: StatLog = {
    timestamp: new Date().toISOString(),
    type,
    ...data,
  };
  logs.push(entry);
  
  // Keep logs at a reasonable maximum capacity (e.g., 5000 records) to prevent LocalStorage bloat
  if (logs.length > 5000) {
    logs.shift();
  }
  saveStatsLogs(logs);
};

export const trackSessionVisit = () => {
  if (typeof window === "undefined") return;
  const visited = sessionStorage.getItem(SESSION_VISIT_KEY);
  if (!visited) {
    trackEvent("visit");
    sessionStorage.setItem(SESSION_VISIT_KEY, "true");
  }
};

export const clearAllStatsLogs = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SESSION_VISIT_KEY);
};

// Quick calculation of stats for dashboard
export function calculateAnalytics() {
  const logs = getStatsLogs();
  
  let totalVisits = 0;
  let totalCompletions = 0;
  let totalFullSaves = 0;
  let totalSnsSaves = 0;
  let totalGenderToggles = 0;

  const seasonCounts = { spring: 0, summer: 0, autumn: 0, winter: 0 };
  const genderCounts = { female: 0, male: 0 };
  
  // Group by date
  const dailyMap: Record<string, { date: string; visits: number; completions: number; saves: number }> = {};

  logs.forEach(log => {
    const lDate = new Date(log.timestamp).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });
    if (!dailyMap[lDate]) {
      dailyMap[lDate] = { date: lDate, visits: 0, completions: 0, saves: 0 };
    }

    switch (log.type) {
      case "visit":
        totalVisits++;
        dailyMap[lDate].visits++;
        break;
      case "test_complete":
        totalCompletions++;
        dailyMap[lDate].completions++;
        if (log.season) {
          seasonCounts[log.season]++;
        }
        if (log.gender) {
          genderCounts[log.gender]++;
        }
        break;
      case "gender_select":
        totalGenderToggles++;
        if (log.gender) {
          genderCounts[log.gender]++;
        }
        break;
      case "full_save":
        totalFullSaves++;
        dailyMap[lDate].saves++;
        break;
      case "sns_save":
        totalSnsSaves++;
        dailyMap[lDate].saves++;
        break;
      case "repr_save":
        totalSnsSaves++;
        dailyMap[lDate].saves++;
        break;
    }
  });

  const dailyTrend = Object.values(dailyMap).sort((a,b) => {
    return a.date.localeCompare(b.date);
  }).slice(-15); // Last 15 days of data

  const totalSaves = totalFullSaves + totalSnsSaves;
  const completionRate = totalVisits > 0 ? (totalCompletions / totalVisits) * 100 : 0;
  const saveRate = totalCompletions > 0 ? (totalSaves / totalCompletions) * 100 : 0;

  return {
    summary: {
      totalVisits,
      totalCompletions,
      totalFullSaves,
      totalSnsSaves,
      totalSaves,
      completionRate: Math.round(completionRate * 10) / 10,
      saveRate: Math.round(saveRate * 10) / 10,
      totalGenderToggles
    },
    seasonCounts,
    genderCounts,
    dailyTrend,
    rawLogs: [...logs].reverse().slice(0, 50) // Last 50 active raw logs
  };
}
