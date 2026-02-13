import { useState } from "react";
import { tradingRules } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

const Rules = () => {
  const [rules, setRules] = useState(tradingRules);
  const [newRule, setNewRule] = useState("");

  const addRule = () => {
    if (!newRule.trim()) return;
    setRules([...rules, { id: Date.now(), text: newRule.trim(), active: true }]);
    setNewRule("");
  };

  const removeRule = (id: number) => setRules(rules.filter((r) => r.id !== id));
  const toggleRule = (id: number) =>
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Trading Rules
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Personal rules for discipline and accountability
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addRule()}
          className="bg-card border-border font-mono text-sm flex-1"
          placeholder="Add a new rule..."
        />
        <Button onClick={addRule} className="font-mono text-xs tracking-wider uppercase">
          Add
        </Button>
      </div>

      <div className="glass-panel divide-y divide-border">
        {rules.map((rule) => (
          <div key={rule.id} className="px-5 py-3 flex items-center gap-4">
            <Switch checked={rule.active} onCheckedChange={() => toggleRule(rule.id)} />
            <span
              className={`font-mono text-xs flex-1 ${
                rule.active ? "text-foreground" : "text-muted-foreground line-through"
              }`}
            >
              {rule.text}
            </span>
            <button onClick={() => removeRule(rule.id)} className="text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
