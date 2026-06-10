"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import {
  Send, Settings, Plus, MessageSquare, User, Bot, Layers, Phone, Menu, X, Code, Box, Palette, Terminal, Search, Zap, LogOut, Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import MermaidDiagram from "@/components/MermaidDiagram";
import ProviderSettings from "@/components/ProviderSettings";
import WhatsAppSettings from "@/components/WhatsAppSettings";
import MCPSettings from "@/components/MCPSettings";

export default function ChatPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const { messages, input, handleInputChange, handleSubmit } = useChat() as any;

  useEffect(() => {
    const savedUser = localStorage.getItem("ai_itu_user");
    if (!savedUser) {
      router.push("/auth");
    } else {
      setUser(JSON.parse(savedUser));
    }
    setIsLoadingUser(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ai_itu_user");
    router.push("/auth");
  };

  const onChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = JSON.parse(localStorage.getItem("ai_itu_config") || "{}");
    const keys = JSON.parse(localStorage.getItem("ai_itu_keys") || "{}");
    const mcpServers = JSON.parse(localStorage.getItem("ai_itu_mcp_servers") || "[]");

    handleSubmit(e, {
      body: {
        provider: config.provider || "openai",
        model: config.model || "gpt-4o",
        apiKeys: keys,
        mcpServers: mcpServers
      }
    });
  };

  if (isLoadingUser || !user) {
    return <div className="h-screen bg-black flex items-center justify-center"><Zap className="animate-pulse text-blue-500" size={48} /></div>;
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className={cn("bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 transition-all flex flex-col", isSidebarOpen ? "w-64" : "w-0 overflow-hidden")}>
        <div className="p-6 font-black text-xl flex items-center gap-2 tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          AI itu
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          <button onClick={() => setActiveTab("chat")} className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium", activeTab === "chat" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
            <MessageSquare size={18} /> Chat
          </button>
          <button onClick={() => setActiveTab("mcp")} className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium", activeTab === "mcp" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
            <Share2 size={18} /> MCP Tools
          </button>
          <button onClick={() => setActiveTab("whatsapp")} className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium", activeTab === "whatsapp" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
            <Phone size={18} /> WhatsApp
          </button>
          <button onClick={() => setActiveTab("settings")} className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium", activeTab === "settings" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 p-2 bg-neutral-800/50 rounded-2xl mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">{user.email[0]}</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{user.email.split('@')[0]}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-neutral-900 flex items-center px-6 justify-between">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:bg-neutral-800 p-2 rounded-xl"><Menu size={20}/></button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto w-full pb-20 space-y-8">
               {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 mt-20">
                   <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-2xl rotate-3">
                      <Zap size={40} className="text-white" />
                   </div>
                   <h2 className="text-5xl font-black tracking-tight">AI itu</h2>
                   <p className="text-neutral-400 text-xl max-w-lg">Super Agent with MCP Security Protocol enabled.</p>
                </div>
              ) : (
                messages.map((m: any) => (
                  <div key={m.id} className={cn("flex gap-6", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", m.role === "user" ? "bg-neutral-800" : "bg-blue-600")}>
                      {m.role === "user" ? <User size={20} className="text-neutral-400" /> : <Bot size={20} className="text-white" />}
                    </div>
                    <div className="flex-1">
                       <div className={cn("text-neutral-200 text-sm md:text-base whitespace-pre-wrap", m.role === "user" ? "text-right" : "text-left")}>
                         {m.content}
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "mcp" && <div className="max-w-2xl mx-auto"><MCPSettings /></div>}
          {activeTab === "settings" && <div className="max-w-2xl mx-auto"><ProviderSettings /></div>}
          {activeTab === "whatsapp" && <div className="max-w-2xl mx-auto"><WhatsAppSettings /></div>}
        </div>

        {activeTab === "chat" && (
          <div className="p-6 md:p-10 bg-gradient-to-t from-black to-transparent">
            <form onSubmit={onChatSubmit} className="max-w-4xl mx-auto relative">
              <input value={input} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none" placeholder="Ask anything... (MCP Tools Active)" />
              <button type="submit" className="absolute right-3 top-3 p-2 bg-blue-600 rounded-xl"><Send size={20}/></button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
