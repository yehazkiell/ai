"use client";

import React from "react";
import { Code, Box, Palette, Terminal, Search, Cpu } from "lucide-react";

const capabilities = [
  { name: "GitHub Ops", icon: <Code size={20} />, desc: "Create repos and manage PRs.", status: "Active" },
  { name: "Neural Search", icon: <Search size={20} />, desc: "Real-time web browsing.", status: "Active" },
  { name: "Model Forge", icon: <Box size={20} />, desc: "Search Hugging Face models.", status: "Beta" },
  { name: "Creative Scripting", icon: <Palette size={20} />, desc: "Automate Blender and Roblox.", status: "Active" },
  { name: "Package Intelligence", icon: <Terminal size={20} />, desc: "Analyze npm packages.", status: "Active" },
  { name: "Multi-Brain Sync", icon: <Cpu size={20} />, desc: "Switch AI providers.", status: "Active" }
];

const AgentCapabilities = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {capabilities.map((cap) => (
        <div key={cap.name} className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <div className="text-blue-400 mb-3">{cap.icon}</div>
          <h4 className="font-bold text-sm mb-1">{cap.name}</h4>
          <p className="text-xs text-neutral-500">{cap.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AgentCapabilities;
