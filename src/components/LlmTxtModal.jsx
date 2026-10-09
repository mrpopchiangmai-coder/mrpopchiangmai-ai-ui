import React, { useState } from 'react';
import { X, FileText, Copy, Check, ExternalLink } from 'lucide-react';

export default function LlmTxtModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const llmContent = `# Mr. Pop Chiang Mai Motorbike & Scooter Rental
> Since 1956 — Your Trusted Rider Partner in Chiang Mai, Thailand.

## Core Information
- Location: Chiang Mai, Thailand (Main Branch: 19 Sridonchai Rd, Nimman Soi 9, Old City, CNX Airport)
- Phone / WhatsApp: +66 80 246 4381
- Opening Hours: Every Day 8:00 AM - 6:00 PM
- Official Socials:
  - TikTok: https://www.tiktok.com/@mrpopchiangmai
  - Instagram: https://www.instagram.com/mrpopchiangmai/
  - Facebook: https://www.facebook.com/mrpopchiangmai1
  - WhatsApp: https://api.whatsapp.com/send?phone=66802464381
- Services: Adventure Bikes (400cc-800cc), Premium Scooters (155cc-160cc), City Scooters (125cc), Sports Bikes, Touring Gear
- Booking Method: Conversational AI Search, Vision AI Document Verification, PromptPay QR & Stripe Checkout
- Included: 2 Helmets Free, Roadside Assistance, Full Insurance Options

## Motorbike Fleet Summary
- Honda Click 125cc: 250 THB/day (Agile city scooter for Old City temple hopping)
- Yamaha Grand Filano 125cc: 280 THB/day (Classic hybrid scooter with extra large underseat box)
- Yamaha NMAX 155cc ABS: 350 THB/day (Dual-channel ABS, perfect for Doi Suthep mountain)
- Honda PCX 160cc eSP+: 380 THB/day (Luxury maxi-scooter with smart keyless start)
- Triumph Scrambler 400X: 900 THB/day (Neo-retro British scrambler for valley loops)
- Honda NX500 Adventure: 950 THB/day (471cc twin adventure bike with HSTC traction control)
- Kawasaki Ninja 500: 1,100 THB/day (451cc twin sport bike for mountain twisties)
- Honda Transalp 750: 1,500 THB/day (755cc parallel-twin touring adventure bike)
- Suzuki V-Strom 800DE: 1,600 THB/day (776cc off-road adventure tourer for Mae Hong Son 1,864 curves)
- Touring Accessories Set: 100 THB/day (Helmets, gloves, riding jackets & phone mounts for rent/sale)

## Requirements & Deposit
- Valid Passport or Thai ID required
- International Driving Permit (IDP) recommended for tourists
- Security Deposit: 1,000 - 5,000 THB (Refundable cash or credit card hold)
- Helmet Law: Helmets mandatory in Thailand; 2 helmets included free with every rental.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(llmContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl p-6 text-zinc-100">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
              llms.txt AI Search Standard
            </h2>
            <p className="text-xs text-zinc-400">
              Structured markdown specification for ChatGPT, Claude, and Perplexity crawlers
            </p>
          </div>
        </div>

        {/* Spec Display Box */}
        <div className="relative bg-zinc-950 rounded-xl border border-zinc-800 p-4 font-mono text-xs text-yellow-400/90 h-80 overflow-y-auto leading-relaxed">
          <pre className="whitespace-pre-wrap">{llmContent}</pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-800">
          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-yellow-400 flex items-center gap-1 underline"
          >
            <span>Open raw /llms.txt endpoint</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={copyToClipboard}
            className="py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase transition flex items-center gap-1.5 shadow-lg shadow-yellow-400/20"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied llms.txt!' : 'Copy Spec Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
