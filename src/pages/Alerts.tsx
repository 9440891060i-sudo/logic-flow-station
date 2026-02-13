import { useState } from "react";
import { alertConfigs } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertConfigs);

  const toggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Alerts & Monitoring
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Manage monitoring rules and alert delivery
        </p>
      </div>

      <div className="glass-panel divide-y divide-border">
        {alerts.map((a) => (
          <div key={a.id} className="px-5 py-4 flex items-center justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-foreground">{a.pair}</span>
                <span className="terminal-text">{a.delivery}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{a.condition}</p>
            </div>
            <Switch
              checked={a.active}
              onCheckedChange={() => toggleAlert(a.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
