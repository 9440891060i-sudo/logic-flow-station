import { analyticsData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

const Analytics = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Analytics
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Behavior and discipline metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="space-y-4">
        {[
          { label: "Rule Adherence", value: analyticsData.ruleAdherence },
          { label: "Session Discipline", value: analyticsData.sessionDiscipline },
          { label: "Risk Compliance", value: analyticsData.riskCompliance },
        ].map((metric) => (
          <div key={metric.label} className="glass-panel p-4 space-y-2">
            <div className="flex justify-between">
              <span className="terminal-text">{metric.label}</span>
              <span className="font-mono text-xs text-foreground">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-1 bg-border [&>div]:bg-foreground" />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Trades", value: analyticsData.totalTrades },
          { label: "Win Rate", value: `${analyticsData.winRate}%` },
          { label: "Avg R:R", value: `${analyticsData.avgRR}` },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 space-y-1">
            <p className="terminal-text">{stat.label}</p>
            <p className="font-mono text-lg text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Weekly Summary */}
      <section className="space-y-3">
        <h2 className="terminal-text">Weekly Summary</h2>
        <div className="glass-panel divide-y divide-border">
          {analyticsData.weeklyStats.map((w) => (
            <div key={w.week} className="px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-xs text-foreground">{w.week}</span>
              <div className="flex gap-6">
                <span className="font-mono text-xs text-muted-foreground">{w.trades} trades</span>
                <span className="font-mono text-xs text-muted-foreground">{w.adherence}% adherence</span>
                <span className={`font-mono text-xs ${w.pnl >= 0 ? "text-foreground" : "text-destructive"}`}>
                  {w.pnl > 0 ? "+" : ""}{w.pnl} pips
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Analytics;
