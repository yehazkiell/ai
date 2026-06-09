/**
 * Mock WhatsApp Service for AI itu
 * This file represents where the whatsapp-web.js or Baileys integration would live.
 */

export const whatsappService = {
  isConnected: false,

  async connect(phoneNumber: string) {
    console.log(`Connecting to WhatsApp for ${phoneNumber}...`);
    // Logic for QR code generation or pairing code would go here
    this.isConnected = true;
    return { success: true, message: "Connected successfully (MOCK)" };
  },

  async sendMessage(to: string, text: string) {
    if (!this.isConnected) {
      throw new Error("WhatsApp not connected");
    }
    console.log(`[WHATSAPP MOCK] To: ${to} | Message: ${text}`);
    return { status: "sent", id: Math.random().toString(36).substring(7) };
  }
};
