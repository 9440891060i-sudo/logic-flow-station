const activeLimits = [
  { label: "Max Risk / Trade", value: "1%", },
  { label: "Max Daily Loss", value: "3%", },
  { label: "Max Concurrent Positions", value: "3", },
  { label: "News Restriction", value: "Active", },
  { label: "Allowed Sessions", value: "London, New York", },
];

const activeTrades = [
  { id: 1, pair: "EUR/USD", direction: "Long", entry: 1.0842, size: "0.5 lot", pnl: "+12 pips", duration: "34m" },
  { id: 2, pair: "GBP/USD", direction: "Short", entry: 1.2745, size: "0.3 lot", pnl: "-4 pips", duration: "12m" },
];

const Executions = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Executions
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Active limits and open trades
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="terminal-text">Active Limits</h2>
        <div className="glass-panel divide-y divide-border">
          {activeLimits.map((limit) => (
            <div key={limit.label} className="px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{limit.label}</span>
              <span className="font-mono text-xs text-foreground">{limit.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="terminal-text">Active Trades</h2>
        {activeTrades.length === 0 ? (
          <div className="glass-panel px-5 py-8 text-center">
            <p className="font-mono text-xs text-muted-foreground">No open positions</p>
          </div>
        ) : (
          <div className="glass-panel divide-y divide-border">
            {activeTrades.map((trade) => (
              <div key={trade.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-foreground w-16">{trade.pair}</span>
                  <span className={`font-mono text-[10px] border border-border px-1.5 py-0.5 uppercase ${
                    trade.direction === "Long" ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {trade.direction}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{trade.entry}</span>
                  <span className="font-mono text-xs text-muted-foreground">{trade.size}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{trade.duration}</span>
                  <span className={`font-mono text-xs ${
                    trade.pnl.startsWith("+") ? "text-foreground" : "text-destructive"
                  }`}>
                    {trade.pnl}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Executions;
