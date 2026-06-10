"use client";

import React, { useState, useEffect } from "react";
import { Share2, Plus, Trash2, Globe, ShieldCheck } from "lucide-react";

const MCPSettings = () => {
  const [servers, setServers] = useState<string[]>([]);
  const [newServer, setNewServer] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ai_itu_mcp_servers");
    if (saved) setServers(JSON.parse(saved));
  }, []);

  const addServer = () => {
    if (newServer && !servers.includes(newServer)) {
      const updated = [...servers, newServer];
      setServers(updated);
      localStorage.setItem("ai_itu_mcp_servers", JSON.stringify(updated));
      setNewServer("");
    }
  };

  const removeServer = (url: string) => {
    const updated = servers.filter(s => s !== url);
    setServers(updated);
    localStorage.setItem("ai_itu_mcp_servers", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-neutral-900 rounded-3xl border border-neutral-800 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
          <Share2 size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold">MCP Server Integration</h3>
          <p className="text-sm text-neutral-500">Connect private tools that only you can access.</p>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex gap-3">
        <ShieldCheck className="text-blue-500 shrink-0" size={20} />
        <p className="text-xs text-blue-200/80 leading-relaxed">
          <strong>Secure Protocol:</strong> MCP servers provide custom tools that are cryptographically isolated from unauthorized bots.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-3 text-neutral-600" size={18} />
            <input
              type="text"
              placeholder="https://mcp-server.example.com"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={newServer}
              onChange={(e) => setNewServer(e.target.value)}
            />
          </div>
          <button
            onClick={addServer}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 rounded-xl transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {servers.length === 0 ? (
            <p className="text-center py-8 text-neutral-600 text-sm italic">No MCP servers connected.</p>
          ) : (
            servers.map((url) => (
              <div key={url} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl border border-neutral-800 group">
                <span className="text-sm text-neutral-300 truncate pr-4">{url}</span>
                <button
                  onClick={() => removeServer(url)}
                  className="text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MCPSettings;
