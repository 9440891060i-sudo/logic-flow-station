import { useState } from "react";

interface DefinitionOption {
  title: string;
  description: string;
  pattern: string;
}

interface ConceptDef {
  label: string;
  options: DefinitionOption[];
}

const conceptDefinitions: Record<string, ConceptDef> = {
  MSS: {
    label: "Market Structure Shift (MSS)",
    options: [
      {
        title: "Swing Break + Displacement",
        description: "A confirmed break of the most recent swing high/low followed by a strong displacement candle that closes beyond structure, shifting directional bias.",
        pattern: "Swing High → Sweep → Displacement Candle Close Beyond → Shift Confirmed",
      },
      {
        title: "Liquidity Sweep + Reversal",
        description: "Price sweeps liquidity above/below a key level, then aggressively reverses with a displacement candle in the opposite direction.",
        pattern: "Liquidity Level → Sweep Wick → Aggressive Reversal Candle → New Directional Bias",
      },
    ],
  },
  BOS: {
    label: "Break of Structure (BOS)",
    options: [
      {
        title: "Body Close Beyond Swing",
        description: "Price closes with the candle body beyond the most recent swing point in the direction of the prevailing trend. Wicks do not count.",
        pattern: "Swing Low → Bullish Candle → Body Closes Above Prior Swing High → BOS Confirmed",
      },
      {
        title: "Any Displacement Beyond Structure",
        description: "Any strong displacement candle that moves beyond the most recent swing point, regardless of whether the body or wick breaks it.",
        pattern: "Swing Point → Displacement Move → Price Beyond Structure → BOS",
      },
    ],
  },
  "Liquidity Sweeps": {
    label: "Liquidity Sweeps",
    options: [
      {
        title: "Equal Highs/Lows Sweep",
        description: "Price takes out a cluster of equal highs or equal lows where stop losses are resting, then immediately reverses back below/above the level.",
        pattern: "Equal Highs (===) → Wick Above → Immediate Rejection → Reversal Candle",
      },
      {
        title: "PDH/PDL Sweep",
        description: "Price sweeps the previous day's high or low to grab resting liquidity, followed by a sharp reversal candle indicating institutional activity.",
        pattern: "Previous Day High/Low → Price Exceeds → Sharp Reversal → Continuation Opposite",
      },
    ],
  },
  FVG: {
    label: "Fair Value Gap (FVG)",
    options: [
      {
        title: "3-Candle Imbalance",
        description: "A three-candle pattern where the wicks of candle 1 and candle 3 do not overlap, leaving a gap in price that represents unfilled orders.",
        pattern: "Candle 1 (High) → Candle 2 (Displacement) → Candle 3 (Low above C1 High) → Gap = FVG",
      },
      {
        title: "Visible Imbalance Zone",
        description: "Any visible area on the chart where price moved too quickly, creating an imbalance zone that price is likely to revisit and fill.",
        pattern: "Normal Price Action → Sudden Displacement → Visible Gap in Price → FVG Zone",
      },
    ],
  },
  "Order Blocks": {
    label: "Order Blocks (OB)",
    options: [
      {
        title: "Last Opposing Candle",
        description: "The last bearish candle before a bullish displacement move (or vice versa) that breaks structure. This candle body marks the order block zone.",
        pattern: "Bearish Candle → Bullish Displacement → BOS → OB = Last Bearish Candle Body",
      },
      {
        title: "Consolidation Before Displacement",
        description: "The entire consolidation range formed before a strong impulsive displacement move. The full range acts as the order block zone.",
        pattern: "Consolidation Range → Impulsive Move → BOS → OB = Full Consolidation Zone",
      },
      {
        title: "Candle Body Only",
        description: "Only the body (open to close) of the last opposing candle before displacement, excluding wicks, defines the valid order block entry zone.",
        pattern: "Opposing Candle → Body Open–Close Range Only → Displacement → OB Zone = Body",
      },
    ],
  },
};

const Definitions = () => {
  const [selections, setSelections] = useState<Record<string, number>>({});

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Definitions
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Your active trading concept definitions
        </p>
      </div>

      {Object.entries(conceptDefinitions).map(([key, concept]) => (
        <section key={key} className="glass-panel p-5 space-y-4">
          <h2 className="font-mono text-sm text-foreground">{concept.label}</h2>

          <div className="space-y-3">
            {concept.options.map((opt, i) => {
              const isSelected = selections[key] === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelections((p) => ({ ...p, [key]: i }))}
                  className={`w-full text-left glass-panel p-4 space-y-3 transition-colors ${
                    isSelected
                      ? "border border-foreground/20 bg-accent"
                      : "border border-transparent hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-foreground">
                      {opt.title}
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {opt.description}
                  </p>
                  <div className="glass-panel p-3">
                    <p className="terminal-text mb-1">Pattern</p>
                    <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                      {opt.pattern}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Definitions;
