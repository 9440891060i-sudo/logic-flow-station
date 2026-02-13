import { useState } from "react";
import { riskSettings } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Execution = () => {
  const [settings, setSettings] = useState(riskSettings);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Execution & Risk
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Risk parameters and execution rules
        </p>
      </div>

      <section className="glass-panel p-5 space-y-5">
        <h2 className="terminal-text">Risk Parameters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="terminal-text">Max Risk / Trade (%)</label>
            <Input
              type="number"
              value={settings.maxRiskPerTrade}
              onChange={(e) => setSettings({ ...settings, maxRiskPerTrade: Number(e.target.value) })}
              className="bg-background border-border font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="terminal-text">Max Daily Loss (%)</label>
            <Input
              type="number"
              value={settings.maxDailyLoss}
              onChange={(e) => setSettings({ ...settings, maxDailyLoss: Number(e.target.value) })}
              className="bg-background border-border font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="terminal-text">Max Concurrent Positions</label>
            <Input
              type="number"
              value={settings.maxConcurrentPositions}
              onChange={(e) => setSettings({ ...settings, maxConcurrentPositions: Number(e.target.value) })}
              className="bg-background border-border font-mono text-sm"
            />
          </div>
        </div>
      </section>

      <section className="glass-panel p-5 space-y-4">
        <h2 className="terminal-text">Execution Rules</h2>

        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-foreground">Restrict trading during high-impact news</span>
          <Switch
            checked={settings.newsRestriction}
            onCheckedChange={(v) => setSettings({ ...settings, newsRestriction: v })}
          />
        </div>

        <div className="space-y-2">
          <label className="terminal-text">Allowed Sessions</label>
          <div className="flex gap-2 flex-wrap">
            {["Asian", "London", "New York"].map((session) => (
              <button
                key={session}
                onClick={() =>
                  setSettings({
                    ...settings,
                    sessionRestrictions: settings.sessionRestrictions.includes(session)
                      ? settings.sessionRestrictions.filter((s) => s !== session)
                      : [...settings.sessionRestrictions, session],
                  })
                }
                className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
                  settings.sessionRestrictions.includes(session)
                    ? "border-foreground text-foreground bg-accent"
                    : "border-border text-muted-foreground"
                }`}
              >
                {session}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Button className="font-mono text-xs tracking-wider uppercase">
        Save Configuration
      </Button>
    </div>
  );
};

export default Execution;
