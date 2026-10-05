import React, { useState } from 'react';
import { X, FileText, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';

export default function LlmTxtModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const llmContent = `# Mr. Pop Chiang Mai Motor & Car Rental
> AI-Powered Scooter, Motorbike, and Car Rental Service in Chiang Mai, Thailand.

## Core Information
- Location: Chiang Mai, Thailand (Pickup at Nimman, Old City, or CNX Airport)
- Services: Scooter Rental (125cc-155cc), Big Bikes (300cc-750cc), Cars & SUVs
- Booking Method: AI Conversational Search, Vision AI ID Verification, PromptPay/Stripe E-Checkout
- Included: 2 Helmets, Full Insurance Options, Medical Emergency Coverage, Hotel Delivery

## Fleet Summary
- Honda Click 125cc: 250 THB/day (Lightweight, agile for Old City)
- Yamaha NMAX 155cc: 350 THB/day (ABS, dual disc, perfect for Doi Suthep)
- Honda PCX 160cc: 380 THB/day (Comfort cruiser, spacious underseat)
- Honda CB500X 500cc: 950 THB/day (Adventure tourer for Samoeng Loop / Pai)
- Toyota Yaris ATIV: 1,100 THB/day (Automatic compact car with Apple CarPlay)
- Honda CR-V Turbo SUV: 1,850 THB/day (Family 7-seater SUV with AWD)

## Requirements & Deposit
- Passport or Thai ID required
- International Driving Permit (IDP) recommended for tourists
- Security Deposit: 1,000 - 3,000 THB (Cash or Credit Card hold)
- Helmet Law: Helmets mandatory in Thailand; 2 helmets included free with every bike.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(llmContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              llms.txt AI Search Standard
            </h2>
            <p className="text-xs text-slate-400">
              Structured markdown specification for ChatGPT, Claude, and Perplexity crawlers
            </p>
          </div>
        </div>

        {/* Spec Display Box */}
        <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-amber-300/90 h-80 overflow-y-auto leading-relaxed">
          <pre className="whitespace-pre-wrap">{llmContent}</pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 underline"
          >
            <span>Open raw /llms.txt endpoint</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={copyToClipboard}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied llms.txt!' : 'Copy Spec Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
