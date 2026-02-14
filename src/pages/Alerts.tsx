import { useState } from "react";
import { X } from "lucide-react";

interface Alert {
  id: number;
  pair: string;
  timeframe: string;
  condition: string;
  delivery: string;
}

const initialAlerts: Alert[] = [
  { id: 1, pair: "EUR/USD", timeframe: "5m", condition: "Next BOS", delivery: "WhatsApp" },
  { id: 2, pair: "GBP/USD", timeframe: "15m", condition: "Liquidity sweep above PDH", delivery: "WhatsApp" },
  { id: 3, pair: "XAU/USD", timeframe: "1h", condition: "Order block retest at 2,341", delivery: "In-app" },
  { id: 4, pair: "USD/JPY", timeframe: "15m", condition: "MSS confirmation", delivery: "WhatsApp" },
  { id: 5, pair: "NAS100", timeframe: "5m", condition: "FVG fill at 18,420", delivery: "Both" },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const deleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Alerts
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Active alerts placed on instruments
        </p>
      </div>

      <div className="glass-panel divide-y divide-border">
        {alerts.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="font-mono text-xs text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          alerts.map((a) => (
            <div key={a.id} className="px-5 py-4 flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-foreground">{a.pair}</span>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 uppercase">
                    {a.timeframe}
                  </span>
                  <span className="terminal-text">{a.delivery}</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{a.condition}</p>
              </div>
              <button
                onClick={() => deleteAlert(a.id)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
