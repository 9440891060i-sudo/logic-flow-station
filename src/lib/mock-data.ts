// Mock data for the Trading OS

export const monitoringItems = [
  { pair: "EUR/USD", session: "London", condition: "FVG + BOS confluence", status: "active" as const },
  { pair: "GBP/USD", session: "New York", condition: "Liquidity sweep above PDH", status: "active" as const },
  { pair: "XAU/USD", session: "London", condition: "Order block retest", status: "paused" as const },
  { pair: "USD/JPY", session: "Asian", condition: "MSS on M15", status: "active" as const },
  { pair: "NAS100", session: "New York", condition: "FVG fill + OB", status: "active" as const },
];

export const recentAlerts = [
  { id: 1, time: "14:32:05", pair: "EUR/USD", message: "BOS confirmed on M15 — bullish structure shift", category: "structure" },
  { id: 2, time: "14:28:41", pair: "GBP/USD", message: "Liquidity swept above 1.2745 — watching for reversal", category: "liquidity" },
  { id: 3, time: "13:55:12", pair: "XAU/USD", message: "FVG filled at 2,341.50 — potential long entry", category: "entry" },
  { id: 4, time: "13:40:09", pair: "NAS100", message: "Order block tested at 18,420 — no confirmation yet", category: "structure" },
  { id: 5, time: "12:15:33", pair: "USD/JPY", message: "MSS detected on M15 — bearish shift", category: "structure" },
];

export const systemStatus = [
  { name: "WhatsApp", status: "connected" as const, detail: "+44 *** *** 8842" },
  { name: "MT5", status: "connected" as const, detail: "Account #48291 — IC Markets" },
];

export const conceptDefinitions = {
  MSS: {
    label: "Market Structure Shift",
    options: [
      "A confirmed break of the most recent swing high/low that shifts directional bias",
      "A displacement candle closing beyond structure with follow-through",
      "A liquidity sweep followed by aggressive displacement in the opposite direction",
    ],
  },
  BOS: {
    label: "Break of Structure",
    options: [
      "Price closing beyond the most recent swing point in the trend direction",
      "A clean break with body close — wicks do not count",
      "Any displacement beyond structure regardless of candle close",
    ],
  },
  "Liquidity Sweeps": {
    label: "Liquidity Sweeps",
    options: [
      "Price taking out equal highs/lows or obvious stop-loss clusters before reversing",
      "A wick beyond a key level followed by an immediate reversal candle",
    ],
  },
  FVG: {
    label: "Fair Value Gap",
    options: [
      "A three-candle pattern where the wicks of candle 1 and 3 do not overlap",
      "Any imbalance visible on the chart where price moved too fast to fill orders",
    ],
  },
  "Order Blocks": {
    label: "Order Blocks",
    options: [
      "The last opposing candle before a displacement move that breaks structure",
      "The entire consolidation range before a strong impulsive move",
      "Only the body of the last bearish/bullish candle before displacement",
    ],
  },
};

export const tradingRules = [
  { id: 1, text: "Never counter-trend on Monday", active: true },
  { id: 2, text: "No trades during high-impact news within 30 minutes", active: true },
  { id: 3, text: "Maximum 2 trades per session", active: true },
  { id: 4, text: "Only take London and New York sessions", active: true },
  { id: 5, text: "Always wait for M15 confirmation before entering on M5", active: false },
];

export const journalEntries = [
  { id: 1, date: "2026-02-12", instrument: "EUR/USD", direction: "Long", entry: 1.0842, exit: 1.0878, pnl: 36, duration: "2h 14m", rulesFollowed: true, notes: "Clean FVG entry after London sweep" },
  { id: 2, date: "2026-02-12", instrument: "GBP/USD", direction: "Short", entry: 1.2745, exit: 1.2698, pnl: 47, duration: "1h 45m", rulesFollowed: true, notes: "Liquidity sweep above PDH, MSS confirmed" },
  { id: 3, date: "2026-02-11", instrument: "XAU/USD", direction: "Long", entry: 2341.50, exit: 2328.20, pnl: -133, duration: "45m", rulesFollowed: false, notes: "Entered without M15 confirmation — rule violation" },
  { id: 4, date: "2026-02-11", instrument: "NAS100", direction: "Long", entry: 18420, exit: 18495, pnl: 75, duration: "3h 10m", rulesFollowed: true, notes: "Order block retest with bullish displacement" },
  { id: 5, date: "2026-02-10", instrument: "USD/JPY", direction: "Short", entry: 152.45, exit: 152.10, pnl: 35, duration: "1h 30m", rulesFollowed: true, notes: "MSS on M15, entry on M5 FVG" },
];

export const riskSettings = {
  maxRiskPerTrade: 1,
  maxDailyLoss: 3,
  maxConcurrentPositions: 3,
  positionSizing: "fixed-percent" as const,
  newsRestriction: true,
  sessionRestrictions: ["London", "New York"],
};

export const analyticsData = {
  ruleAdherence: 82,
  sessionDiscipline: 91,
  riskCompliance: 95,
  totalTrades: 47,
  winRate: 64,
  avgRR: 1.8,
  weeklyStats: [
    { week: "Feb 3-7", trades: 12, adherence: 83, pnl: 142 },
    { week: "Feb 10-14", trades: 8, adherence: 75, pnl: 60 },
  ],
};

export const alertConfigs = [
  { id: 1, pair: "EUR/USD", condition: "FVG + BOS confluence", delivery: "WhatsApp", active: true },
  { id: 2, pair: "GBP/USD", condition: "Liquidity sweep above PDH", delivery: "WhatsApp", active: true },
  { id: 3, pair: "XAU/USD", condition: "Order block retest", delivery: "In-app", active: false },
  { id: 4, pair: "USD/JPY", condition: "MSS on M15", delivery: "WhatsApp", active: true },
  { id: 5, pair: "NAS100", condition: "FVG fill + OB", delivery: "Both", active: true },
];
