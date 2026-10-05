import React from 'react';
import { Bot, Sparkles, FileText, Globe, ShieldCheck, MapPin } from 'lucide-react';

export default function Header({ currency, setCurrency, onOpenLlmTxt }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-500/20">
                <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  Mr. Pop <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">Chiang Mai</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  <Sparkles className="w-3 h-3 text-rose-400" /> AI Native
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400 inline" /> Nimman • Old City • CNX Airport
              </p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setCurrency('THB')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currency === 'THB'
                    ? 'bg-rose-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ฿ THB
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-rose-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* llms.txt standard trigger */}
            <button
              onClick={onOpenLlmTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="View AI Crawlable standard spec"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">llms.txt</span>
            </button>

            {/* Verified Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              Instant Booking Active
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
