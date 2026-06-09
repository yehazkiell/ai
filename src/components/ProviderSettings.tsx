"use client";

import React, { useState, useEffect } from "react";
import { Key, Save, Server, Cpu } from "lucide-react";

const providers = [
  { id: "openai", name: "OpenAI", models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"] },
  { id: "anthropic", name: "Anthropic", models: ["claude-3-5-sonnet-20240620", "claude-3-opus-20240229", "claude-3-haiku-20240307"] },
  { id: "google", name: "Google Gemini", models: ["gemini-1.5-pro", "gemini-1.5-flash"] },
  { id: "xai", name: "xAI (Grok)", models: ["grok-beta", "grok-vision-beta"] },
];

const ProviderSettings = () => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  useEffect(() => {
    const savedKeys = localStorage.getItem("ai_itu_keys");
    if (savedKeys) setApiKeys(JSON.parse(savedKeys));

    const savedConfig = localStorage.getItem("ai_itu_config");
    if (savedConfig) {
      const { provider, model } = JSON.parse(savedConfig);
      setSelectedProvider(provider);
      setSelectedModel(model);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("ai_itu_keys", JSON.stringify(apiKeys));
    localStorage.setItem("ai_itu_config", JSON.stringify({ provider: selectedProvider, model: selectedModel }));
    alert("Settings saved!");
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Server className="text-blue-500" size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">AI Provider & Models</h3>
          <p className="text-xs text-neutral-500">Configure your brain</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 mb-1 block tracking-wider">Select Provider</label>
          <div className="grid grid-cols-2 gap-2">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProvider(p.id);
                  setSelectedModel(p.models[0]);
                }}
                className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                  selectedProvider === p.id
                    ? "bg-blue-600/10 border-blue-500 text-blue-400"
                    : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-750"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 mb-1 block tracking-wider">Select Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {providers.find(p => p.id === selectedProvider)?.models.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 mb-1 block tracking-wider">API Key</label>
          <div className="relative">
            <Key className="absolute left-3 top-2.5 text-neutral-600" size={14} />
            <input
              type="password"
              placeholder={`${selectedProvider.toUpperCase()} API Key`}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={apiKeys[selectedProvider] || ""}
              onChange={(e) => setApiKeys({ ...apiKeys, [selectedProvider]: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-neutral-100 hover:bg-white text-neutral-900 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Save size={16} />
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ProviderSettings;
