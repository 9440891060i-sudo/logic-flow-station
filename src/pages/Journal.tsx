import { journalEntries, analyticsData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Journal = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Trade Journal
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Auto-logged from MT5
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Trades", value: journalEntries.length },
          { label: "Win Rate", value: `${Math.round((journalEntries.filter((e) => e.pnl > 0).length / journalEntries.length) * 100)}%` },
          { label: "Net P&L", value: `${journalEntries.reduce((s, e) => s + e.pnl, 0)} pips` },
          { label: "Rules Followed", value: `${Math.round((journalEntries.filter((e) => e.rulesFollowed).length / journalEntries.length) * 100)}%` },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 space-y-1">
            <p className="terminal-text">{stat.label}</p>
            <p className="font-mono text-lg text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="terminal-text">Date</TableHead>
              <TableHead className="terminal-text">Instrument</TableHead>
              <TableHead className="terminal-text">Dir</TableHead>
              <TableHead className="terminal-text">Entry</TableHead>
              <TableHead className="terminal-text">Exit</TableHead>
              <TableHead className="terminal-text">P&L</TableHead>
              <TableHead className="terminal-text">Duration</TableHead>
              <TableHead className="terminal-text">Rules</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries.map((entry) => (
              <TableRow key={entry.id} className="border-border">
                <TableCell className="font-mono text-xs">{entry.date}</TableCell>
                <TableCell className="font-mono text-xs">{entry.instrument}</TableCell>
                <TableCell className="font-mono text-xs">{entry.direction}</TableCell>
                <TableCell className="font-mono text-xs">{entry.entry}</TableCell>
                <TableCell className="font-mono text-xs">{entry.exit}</TableCell>
                <TableCell className={`font-mono text-xs ${entry.pnl >= 0 ? "text-foreground" : "text-destructive"}`}>
                  {entry.pnl > 0 ? "+" : ""}{entry.pnl}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{entry.duration}</TableCell>
                <TableCell>
                  <span className={`status-dot ${entry.rulesFollowed ? "status-online" : "status-warning"}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Analytics */}
      <section className="space-y-3">
        <h2 className="terminal-text">Analytics</h2>
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
      </section>

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

export default Journal;
