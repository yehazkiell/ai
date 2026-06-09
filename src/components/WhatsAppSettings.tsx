"use client";

import React, { useState } from "react";
import { Phone, CheckCircle2, Link as LinkIcon, RefreshCw } from "lucide-react";

const WhatsAppSettings = () => {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleConnect = () => {
    setStatus("connecting");
    // Simulate connection
    setTimeout(() => {
      setStatus("connected");
    }, 2000);
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Phone className="text-green-500" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">WhatsApp Connection</h3>
            <p className="text-xs text-neutral-500">Enable AI itu to send messages</p>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
          status === "connected" ? "bg-green-500/20 text-green-500" :
          status === "connecting" ? "bg-yellow-500/20 text-yellow-500" :
          "bg-neutral-800 text-neutral-400"
        }`}>
          {status}
        </div>
      </div>

      {status === "disconnected" ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Phone Number (e.g., +62...)"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={handleConnect}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <LinkIcon size={16} />
            Connect WhatsApp
          </button>
        </div>
      ) : status === "connecting" ? (
        <div className="flex flex-col items-center py-4 space-y-3">
          <RefreshCw className="animate-spin text-green-500" size={32} />
          <p className="text-sm text-neutral-400">Authenticating with WhatsApp...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-lg border border-green-500/30">
            <CheckCircle2 className="text-green-500" size={16} />
            <span className="text-sm text-neutral-200">Connected to {phoneNumber || "+62xxxxxx"}</span>
          </div>
          <button
            onClick={() => setStatus("disconnected")}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 rounded-lg text-sm font-medium border border-neutral-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppSettings;
