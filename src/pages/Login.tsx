import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — navigate to onboarding or dashboard
    localStorage.setItem("ptos_user", JSON.stringify({ email, onboarded: false }));
    navigate("/onboarding");
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
          Personal Trading Operating System
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <Button
            type="submit"
            className="w-full font-mono text-xs tracking-wider uppercase"
          >
            Access System
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground">
          No account?{" "}
          <button onClick={() => navigate("/onboarding")} className="text-foreground underline underline-offset-4">
            Initialize
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
