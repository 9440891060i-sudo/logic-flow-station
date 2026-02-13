import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { systemStatus } from "@/lib/mock-data";

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
  TradingView: {
    fields: [
      { label: "Webhook URL", placeholder: "https://hooks.example.com/tv", key: "webhook" },
      { label: "Username", placeholder: "trader_handle", key: "username" },
    ],
  },
};

const Connections = () => {
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});

  const updateField = (service: string, key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [service]: { ...prev[service], [key]: value },
    }));
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Connections
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">Manage integrations</p>
      </div>

      {systemStatus.map((s) => {
        const config = connectionConfigs[s.name];
        return (
          <section key={s.name} className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`status-dot ${
                    s.status === "connected" ? "status-online" : "status-offline"
                  }`}
                />
                <h2 className="font-mono text-sm text-foreground">{s.name}</h2>
              </div>
              <span className="terminal-text">{s.status}</span>
            </div>

            {config && (
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

            <div className="flex gap-2">
              <Button
                variant={s.status === "connected" ? "outline" : "default"}
                className="font-mono text-xs tracking-wider uppercase"
              >
                {s.status === "connected" ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Connections;
