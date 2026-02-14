import { useState } from "react";
import { systemStatus } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const connectionConfigs: Record<string, { fields: { label: string; placeholder: string; key: string }[] }> = {
  WhatsApp: {
    fields: [
      { label: "Phone Number", placeholder: "+1 234 567 8900", key: "phone" },
      { label: "API Token", placeholder: "whatsapp-api-token", key: "token" },
    ],
  },
  MT5: {
    fields: [
      { label: "Account Number", placeholder: "48291", key: "account" },
      { label: "Server", placeholder: "ICMarkets-Live", key: "server" },
      { label: "Password", placeholder: "••••••••", key: "password" },
    ],
  },
};

const Dashboard = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    WhatsApp: true,
    MT5: true,
  });
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});

  const handleToggle = (name: string) => {
    setToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const updateField = (service: string, key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [service]: { ...prev[service], [key]: value },
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Dashboard
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">System overview</p>
      </div>

      {/* Connections */}
      <section className="space-y-3">
        <h2 className="terminal-text">Connections</h2>
        <div className="space-y-3">
          {systemStatus.map((s) => {
            const config = connectionConfigs[s.name];
            return (
              <div key={s.name} className="glass-panel p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`status-dot ${
                        toggles[s.name] ? "status-online" : "status-offline"
                      }`}
                    />
                    <span className="font-mono text-sm text-foreground">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {toggles[s.name] ? s.detail : "Disabled"}
                    </span>
                    <Switch
                      checked={toggles[s.name] || false}
                      onCheckedChange={() => handleToggle(s.name)}
                    />
                  </div>
                </div>

                {toggles[s.name] && config && (
                  <div className="space-y-3">
                    {config.fields.map((f) => (
                      <div key={f.key} className="space-y-1">
                        <label className="terminal-text">{f.label}</label>
                        <Input
                          value={configs[s.name]?.[f.key] || ""}
                          onChange={(e) => updateField(s.name, f.key, e.target.value)}
                          className="bg-background border-border font-mono text-sm"
                          placeholder={f.placeholder}
                          type={f.key === "password" || f.key === "token" ? "password" : "text"}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
