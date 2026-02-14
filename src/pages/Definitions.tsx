import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DefinitionOption {
  title: string;
  description: string;
}

interface ConceptDef {
  label: string;
  abbr: string;
  options: DefinitionOption[];
}

const concepts: ConceptDef[] = [
  {
    label: "Market Structure Shift",
    abbr: "MSS",
    options: [
      {
        title: "Swing Break + Displacement",
        description: "A confirmed break of the most recent swing high/low followed by a strong displacement candle that closes beyond structure, shifting directional bias.",
      },
      {
        title: "Liquidity Sweep + Reversal",
        description: "Price sweeps liquidity above/below a key level, then aggressively reverses with a displacement candle in the opposite direction.",
      },
    ],
  },
  {
    label: "Break of Structure",
    abbr: "BOS",
    options: [
      {
        title: "Body Close Beyond Swing",
        description: "Price closes with the candle body beyond the most recent swing point in the direction of the prevailing trend. Wicks do not count.",
      },
      {
        title: "Any Displacement Beyond Structure",
        description: "Any strong displacement candle that moves beyond the most recent swing point, regardless of whether the body or wick breaks it.",
      },
    ],
  },
  {
    label: "Liquidity Sweeps",
    abbr: "LQ",
    options: [
      {
        title: "Equal Highs/Lows Sweep",
        description: "Price takes out a cluster of equal highs or equal lows where stop losses are resting, then immediately reverses back below/above the level.",
      },
      {
        title: "PDH/PDL Sweep",
        description: "Price sweeps the previous day's high or low to grab resting liquidity, followed by a sharp reversal candle indicating institutional activity.",
      },
    ],
  },
  {
    label: "Fair Value Gap",
    abbr: "FVG",
    options: [
      {
        title: "3-Candle Imbalance",
        description: "A three-candle pattern where the wicks of candle 1 and candle 3 do not overlap, leaving a gap in price that represents unfilled orders.",
      },
      {
        title: "Visible Imbalance Zone",
        description: "Any visible area on the chart where price moved too quickly, creating an imbalance zone that price is likely to revisit and fill.",
      },
    ],
  },
  {
    label: "Order Blocks",
    abbr: "OB",
    options: [
      {
        title: "Last Opposing Candle",
        description: "The last bearish candle before a bullish displacement move (or vice versa) that breaks structure. This candle body marks the order block zone.",
      },
      {
        title: "Consolidation Before Displacement",
        description: "The entire consolidation range formed before a strong impulsive displacement move. The full range acts as the order block zone.",
      },
      {
        title: "Candle Body Only",
        description: "Only the body (open to close) of the last opposing candle before displacement, excluding wicks, defines the valid order block entry zone.",
      },
    ],
  },
];

const Definitions = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, number>>({});

  const toggle = (abbr: string) => {
    setExpanded((prev) => (prev === abbr ? null : abbr));
  };

  return (
    <div className="space-y-4 max-w-4xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Definitions
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Select your active definitions
        </p>
      </div>

      <div className="space-y-2">
        {concepts.map((concept) => {
          const isOpen = expanded === concept.abbr;
          return (
            <div key={concept.abbr} className="glass-panel">
              <button
                onClick={() => toggle(concept.abbr)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-foreground">
                    {concept.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 uppercase">
                    {concept.abbr}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-3">
                  {concept.options.map((opt, i) => {
                    const isSelected = selections[concept.abbr] === i;
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setSelections((p) => ({ ...p, [concept.abbr]: i }))
                        }
                        className={`w-full text-left flex items-stretch gap-4 p-4 border transition-colors ${
                          isSelected
                            ? "border-foreground/20 bg-accent"
                            : "border-border hover:bg-accent/30"
                        }`}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
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
                        </div>
                        <div className="w-24 h-16 shrink-0 border border-border bg-card flex items-center justify-center">
                          <span className="font-mono text-[9px] text-muted-foreground">Chart</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Definitions;
