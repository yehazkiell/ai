"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ShieldAlert, Lock, Mail, UserPlus, LogIn, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple mock auth for this platform
    if (mode === "register") {
      localStorage.setItem("ai_itu_user", JSON.stringify({ email }));
      alert("Registration successful! Welcome to AI itu.");
      router.push("/");
    } else {
      const user = localStorage.getItem("ai_itu_user");
      if (user) {
        router.push("/");
      } else {
        setError("User not found. Please register first.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-xl shadow-blue-500/20">
            <Zap size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">AI itu</h1>
          <p className="text-neutral-400">The Ultimate AI Super Agent Platform</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          {/* Warning Box */}
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex gap-3">
            <ShieldAlert className="text-yellow-500 shrink-0" size={20} />
            <div className="text-xs text-yellow-200/80 leading-relaxed">
              <span className="font-bold text-yellow-500 block mb-1 uppercase tracking-wider">Privacy Notice</span>
              Jangan gunakan password yang sama dengan akun lain. Password akan masuk ke database kami. API Key Anda tetap aman di browser Anda (Local Storage).
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-neutral-600" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-neutral-800/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-neutral-600" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-neutral-800/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs px-1">{error}</p>}

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/5 mt-6"
            >
              {mode === "login" ? <LogIn size={18} /> : <UserPlus size={18} />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col items-center gap-4">
             <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
             >
               {mode === "login" ? "Don't have an account?" : "Already have an account?"}
               <span className="text-blue-400 font-medium">{mode === "login" ? "Register" : "Login"}</span>
               <ArrowRight size={14} />
             </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
          By continuing, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
}
