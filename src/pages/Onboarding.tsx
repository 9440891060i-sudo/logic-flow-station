import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const steps = ["Identity", "Trading Style", "Timezone", "Alerts"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", style: "", timezone: "", alertChannel: "" });

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      localStorage.setItem("ptos_user", JSON.stringify({ ...data, onboarded: true }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <p className="terminal-text">System Initialization — Step {step + 1}/{steps.length}</p>
          <h2 className="font-mono text-lg text-foreground">{steps[step]}</h2>
        </div>

        {/* Progress */}
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 ${i <= step ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>

        <div className="space-y-4">
          {step === 0 && (
            <div className="space-y-2">
              <label className="terminal-text">Display Name</label>
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="bg-card border-border font-mono text-sm"
                placeholder="Enter your name"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-2">
              <label className="terminal-text">Primary Trading Style</label>
              <Select value={data.style} onValueChange={(v) => setData({ ...data, style: v })}>
                <SelectTrigger className="bg-card border-border font-mono text-sm">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scalping">Scalping</SelectItem>
                  <SelectItem value="intraday">Intraday</SelectItem>
                  <SelectItem value="swing">Swing</SelectItem>
                  <SelectItem value="position">Position</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <label className="terminal-text">Timezone</label>
              <Select value={data.timezone} onValueChange={(v) => setData({ ...data, timezone: v })}>
                <SelectTrigger className="bg-card border-border font-mono text-sm">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST (UTC-5)</SelectItem>
                  <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                  <SelectItem value="CET">CET (UTC+1)</SelectItem>
                  <SelectItem value="JST">JST (UTC+9)</SelectItem>
                  <SelectItem value="AEST">AEST (UTC+10)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <label className="terminal-text">Primary Alert Channel</label>
              <Select value={data.alertChannel} onValueChange={(v) => setData({ ...data, alertChannel: v })}>
                <SelectTrigger className="bg-card border-border font-mono text-sm">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="in-app">In-App Only</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="font-mono text-xs tracking-wider uppercase">
              Back
            </Button>
          )}
          <Button onClick={next} className="flex-1 font-mono text-xs tracking-wider uppercase">
            {step === steps.length - 1 ? "Complete Setup" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
