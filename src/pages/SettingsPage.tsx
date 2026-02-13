import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const [name, setName] = useState("Trader");
  const [timezone, setTimezone] = useState("UTC");

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
          Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">Profile and preferences</p>
      </div>

      <section className="glass-panel p-5 space-y-4">
        <h2 className="terminal-text">Profile</h2>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="terminal-text">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-border font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="terminal-text">Timezone</label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="bg-background border-border font-mono text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="GMT">GMT</SelectItem>
                <SelectItem value="CET">CET</SelectItem>
                <SelectItem value="JST">JST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="font-mono text-xs tracking-wider uppercase">Save</Button>
      </section>
    </div>
  );
};

export default SettingsPage;
