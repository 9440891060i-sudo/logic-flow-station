import { monitoringItems, recentAlerts, systemStatus } from "@/lib/mock-data";

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Command Center
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">System overview</p>
      </div>

      {/* System Status */}
      <section className="space-y-3">
        <h2 className="terminal-text">System Status</h2>
        <div className="glass-panel p-4 space-y-3">
          {systemStatus.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`status-dot ${
                    s.status === "connected" ? "status-online" : "status-offline"
                  }`}
                />
                <span className="font-mono text-xs text-foreground">{s.name}</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{s.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoring */}
      <section className="space-y-3">
        <h2 className="terminal-text">Active Monitoring</h2>
        <div className="glass-panel divide-y divide-border">
          {monitoringItems.map((m, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <span
                  className={`status-dot ${
                    m.status === "active" ? "status-online" : "status-warning"
                  }`}
                />
                <span className="font-mono text-xs text-foreground w-20">{m.pair}</span>
                <span className="font-mono text-xs text-muted-foreground">{m.condition}</span>
              </div>
              <span className="terminal-text">{m.session}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="space-y-3">
        <h2 className="terminal-text">Recent Alerts</h2>
        <div className="glass-panel divide-y divide-border">
          {recentAlerts.map((a) => (
            <div key={a.id} className="px-4 py-3 flex gap-4">
              <span className="font-mono text-xs text-muted-foreground w-16 shrink-0">{a.time}</span>
              <span className="font-mono text-xs text-foreground w-16 shrink-0">{a.pair}</span>
              <span className="font-mono text-xs text-muted-foreground flex-1">{a.message}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
