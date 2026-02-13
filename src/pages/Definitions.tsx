import { useState } from "react";
import { conceptDefinitions } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Definitions = () => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [customs, setCustoms] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Definitions
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Configure your trading logic definitions
        </p>
      </div>

      {Object.entries(conceptDefinitions).map(([key, concept]) => (
        <section key={key} className="glass-panel p-5 space-y-4">
          <h2 className="font-mono text-sm text-foreground">{concept.label}</h2>

          <div className="space-y-2">
            <label className="terminal-text">Active Definition</label>
            <Select
              value={selections[key] || ""}
              onValueChange={(v) => setSelections((p) => ({ ...p, [key]: v }))}
            >
              <SelectTrigger className="bg-background border-border font-mono text-xs">
                <SelectValue placeholder="Select definition" />
              </SelectTrigger>
              <SelectContent>
                {concept.options.map((opt, i) => (
                  <SelectItem key={i} value={String(i)} className="font-mono text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="terminal-text">Custom Explanation</label>
              <span className="text-[10px] font-mono text-muted-foreground border border-border px-1.5 py-0.5 uppercase tracking-wider">
                Experimental
              </span>
            </div>
            <Textarea
              value={customs[key] || ""}
              onChange={(e) => setCustoms((p) => ({ ...p, [key]: e.target.value }))}
              className="bg-background border-border font-mono text-xs min-h-[60px]"
              placeholder="Add your own interpretation..."
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Definitions;
