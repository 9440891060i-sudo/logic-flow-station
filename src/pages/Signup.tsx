import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      localStorage.setItem("ptos_user", JSON.stringify({ email, onboarded: true }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex items-center justify-center gap-3">
          <Terminal className="h-6 w-6 text-foreground" />
          <h1 className="font-mono text-lg font-semibold tracking-widest text-foreground uppercase">
            PTOS
          </h1>
        </div>
        <p className="text-center text-xs text-muted-foreground font-mono tracking-wide">
          {step === "form" ? "Create your account" : "Verify your email"}
        </p>

        {step === "form" ? (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="space-y-2">
              <label className="terminal-text">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border font-mono text-sm"
                placeholder="trader@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="terminal-text">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-card border-border font-mono text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="terminal-text">Re-enter Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-card border-border font-mono text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p className="font-mono text-xs text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full font-mono text-xs tracking-wider uppercase"
            >
              Continue
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground font-mono text-center">
              A 6-digit code has been sent to <span className="text-foreground">{email}</span>
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-[10px] text-muted-foreground font-mono">
              Dummy — enter any 6 digits
            </p>
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="w-full font-mono text-xs tracking-wider uppercase"
            >
              Verify & Sign Up
            </Button>
            <button
              onClick={() => setStep("form")}
              className="w-full text-xs text-muted-foreground font-mono underline underline-offset-4 hover:text-foreground"
            >
              Back
            </button>
          </div>
        )}

        {step === "form" && (
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-foreground underline underline-offset-4">
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
