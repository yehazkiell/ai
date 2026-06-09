"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Send, Settings, Plus, MessageSquare, User, Bot, Layers, Phone, Menu, X, Code, Box, Palette, Terminal, Search, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import MermaidDiagram from "@/components/MermaidDiagram";
import ProviderSettings from "@/components/ProviderSettings";
import WhatsAppSettings from "@/components/WhatsAppSettings";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const { messages, input, handleInputChange, handleSubmit } = useChat() as any;

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className={cn("bg-neutral-900 border-r border-neutral-800 transition-all", isSidebarOpen ? "w-64" : "w-0 overflow-hidden")}>
        <div className="p-4 font-bold text-xl flex items-center gap-2"><Zap size={20} className="text-blue-500" /> AI itu</div>
        <nav className="mt-4 px-2 space-y-1">
          <button onClick={() => setActiveTab("chat")} className="w-full flex items-center gap-2 p-2 hover:bg-neutral-800 rounded">Chat</button>
          <button onClick={() => setActiveTab("whatsapp")} className="w-full flex items-center gap-2 p-2 hover:bg-neutral-800 rounded">WhatsApp</button>
          <button onClick={() => setActiveTab("settings")} className="w-full flex items-center gap-2 p-2 hover:bg-neutral-800 rounded">Settings</button>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-neutral-800 flex items-center px-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu size={20}/></button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "chat" && messages.map((m: any) => (
            <div key={m.id} className="mb-4">
              <div className="font-bold mb-1">{m.role === "user" ? "You" : "AI itu"}</div>
              <div className="text-neutral-300">
                {m.content.split("```mermaid").map((part: string, i: number) => {
                  if (i === 0) return <div key={i}>{part}</div>;
                  const [code, ...rest] = part.split("```");
                  return <div key={i}><MermaidDiagram code={code.trim()} />{rest.join("```")}</div>;
                })}
              </div>
            </div>
          ))}
          {activeTab === "settings" && <ProviderSettings />}
          {activeTab === "whatsapp" && <WhatsAppSettings />}
        </div>
        {activeTab === "chat" && (
          <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 relative">
            <input value={input} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 pr-10" placeholder="Ask anything..." />
            <button type="submit" className="absolute right-6 top-6"><Send size={18}/></button>
          </form>
        )}
      </main>
    </div>
  );
}
