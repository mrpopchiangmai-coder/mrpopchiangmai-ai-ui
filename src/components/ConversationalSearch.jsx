import React, { useState } from 'react';
import { Search, Mic, Sparkles, SlidersHorizontal, ArrowRight, MessageSquareText, RefreshCw } from 'lucide-react';

export default function ConversationalSearch({
  query,
  setQuery,
  activeCategory,
  setActiveCategory,
  onSearchSubmit,
  isAnalyzing,
  aiInterpretation
}) {
  const [isListening, setIsListening] = useState(false);

  const categories = ['All', 'Scooter', 'Maxi Scooter', 'Big Bike', 'Car'];

  const promptPills = [
    { label: '🛵 Scooter for Old City Moat (250฿)', query: 'agile 125cc scooter for Old City temple hopping' },
    { label: '⛰️ Doi Suthep Mountain Cruiser', query: '155cc ABS scooter with power for steep mountain roads' },
    { label: '🏞️ Mae Hong Son Loop / Pai (500cc)', query: '500cc adventure bike with panniers for Pai loop' },
    { label: '🚗 Airport CNX Family Car', query: 'automatic car with aircon delivered to Chiang Mai airport' },
  ];

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery("I need a comfortable 155cc scooter with ABS for 3 days to ride up Doi Suthep mountain");
      setIsListening(false);
      onSearchSubmit();
    }, 2200);
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-transparent py-8 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title / Hero tagline */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            AI-Native Motor & Car Rental in Chiang Mai
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Rent Vehicles in <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">Plain Language</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            No dropdowns. Just tell our AI where you're riding, your budget, or vehicle preference. Instant live availability & ID check.
          </p>
        </div>

        {/* AI Input Box */}
        <div className="relative max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="relative flex items-center"
          >
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Honda 125cc near Nimman for 4 days' or '7-seater SUV for Doi Inthanon trip'..."
              className="w-full pl-12 pr-28 py-4 bg-slate-900/90 text-white placeholder-slate-500 text-sm sm:text-base rounded-2xl border border-white/15 focus:outline-none focus:border-rose-500/80 focus:ring-4 focus:ring-rose-500/15 shadow-2xl transition-all"
            />

            <div className="absolute right-3 flex items-center gap-1.5">
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-2.5 rounded-xl text-slate-400 hover:text-white transition ${
                  isListening ? 'bg-rose-500 text-white animate-bounce' : 'hover:bg-slate-800'
                }`}
                title="Speak to AI"
              >
                <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold hover:from-rose-500 hover:to-rose-400 transition shadow-lg shadow-rose-500/20 active:scale-95"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Ask AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Audio Recording Overlay Indicator */}
          {isListening && (
            <div className="mt-2 text-center text-xs text-rose-400 font-medium animate-pulse flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Listening... Speak your rental request now in English, Thai, Chinese, or French...
            </div>
          )}
        </div>

        {/* AI Interpretation Trace Card */}
        {aiInterpretation && (
          <div className="max-w-3xl mx-auto mt-4 p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-2.5 shadow-lg">
            <MessageSquareText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-300">AI Intent Resolved:</span> {aiInterpretation}
            </div>
          </div>
        )}

        {/* Quick Prompt Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1 hidden sm:inline">Try prompts:</span>
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(pill.query);
                onSearchSubmit(pill.query);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition flex items-center gap-1 active:scale-95"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex items-center justify-center border-t border-white/5 pt-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat === 'All' ? 'All Fleet' : cat + 's'}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
