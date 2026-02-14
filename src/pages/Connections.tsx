import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

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

const Connections = () => {
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});
  const [connected, setConnected] = useState<Record<string, boolean>>({
    WhatsApp: true,
    MT5: true,
  });

  const updateField = (service: string, key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [service]: { ...prev[service], [key]: value },
    }));
  };

  const toggleConnection = (service: string) => {
    setConnected((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Connections
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">Manage integrations</p>
      </div>

      {Object.entries(connectionConfigs).map(([name, config]) => (
        <section key={name} className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`status-dot ${connected[name] ? "status-online" : "status-offline"}`}
              />
              <h2 className="font-mono text-sm text-foreground">{name}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="terminal-text">
                {connected[name] ? "Connected" : "Disconnected"}
              </span>
              <Switch
                checked={connected[name]}
                onCheckedChange={() => toggleConnection(name)}
              />
            </div>
          </div>

          {connected[name] && (
            <div className="space-y-3">
              {config.fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  <label className="terminal-text">{f.label}</label>
                  <Input
                    value={configs[name]?.[f.key] || ""}
                    onChange={(e) => updateField(name, f.key, e.target.value)}
                    className="bg-background border-border font-mono text-sm"
                    placeholder={f.placeholder}
                    type={f.key === "password" || f.key === "token" ? "password" : "text"}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default Connections;
