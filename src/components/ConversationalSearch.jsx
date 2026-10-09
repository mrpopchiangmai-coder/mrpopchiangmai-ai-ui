import React, { useState } from 'react';
import { Search, Mic, Sparkles, ArrowRight, MessageSquareText, RefreshCw } from 'lucide-react';

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

  const categories = ['All', 'Adventure Bikes', 'Premium Scooters', 'City Scooters', 'Sports Bikes', 'Touring Accessories'];

  const promptPills = [
    { label: '🛵 Honda Click for 5 days', query: 'how much is a honda click for 5 days' },
    { label: '🏍️ Scrambler from 19-25 Oct', query: 'how much is the scrambler from 19-25 oct' },
    { label: '⛰️ NMAX 155cc for Doi Suthep', query: '155cc NMAX with ABS for Doi Suthep mountain' },
    { label: '🏔️ V-Strom 800DE for Pai Loop', query: 'Suzuki V-Strom 800DE for 1864 curves Mae Hong Son loop' },
  ];

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery("I need a comfortable 155cc NMAX scooter with ABS for 3 days to ride up Doi Suthep mountain");
      setIsListening(false);
      onSearchSubmit();
    }, 2200);
  };

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900/90 via-[#0A0A0A]/95 to-[#0A0A0A] py-10 border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title / Hero tagline */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Since 1956 • Trusted Rider Partner in Chiang Mai
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Rent Motorbikes in <span className="text-yellow-400">Plain Language</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Describe your riding route or budget. Our AI instantly matches you with high-quality scooters, adventure bikes, and touring gear with 0 waiting time.
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
            <div className="absolute left-4 text-yellow-400 pointer-events-none">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Yamaha NMAX 155cc for 3 days' or 'Suzuki V-Strom 800DE for Mae Hong Son loop'..."
              className="w-full pl-12 pr-28 py-4 bg-zinc-900 text-white placeholder-zinc-500 text-sm sm:text-base rounded-2xl border border-zinc-700 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 shadow-2xl transition-all"
            />

            <div className="absolute right-3 flex items-center gap-1.5">
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-2.5 rounded-xl text-zinc-400 hover:text-white transition ${
                  isListening ? 'bg-red-600 text-white animate-bounce' : 'hover:bg-zinc-800'
                }`}
                title="Speak to AI"
              >
                <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase transition shadow-lg shadow-yellow-400/20 active:scale-95"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    <span>Ask AI</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Audio Recording Overlay Indicator */}
          {isListening && (
            <div className="mt-2 text-center text-xs text-yellow-400 font-bold animate-pulse flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Listening... Speak your bike rental request now...
            </div>
          )}
        </div>

        {/* AI Interpretation Trace Card */}
        {aiInterpretation && (
          <div className="max-w-3xl mx-auto mt-4 p-3 rounded-xl bg-zinc-900 border border-yellow-400/40 text-xs text-zinc-300 flex items-start gap-2.5 shadow-lg">
            <MessageSquareText className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-yellow-400">AI Intent Resolved:</span> {aiInterpretation}
            </div>
          </div>
        )}

        {/* Quick Prompt Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mr-1 hidden sm:inline">Rider Prompts:</span>
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(pill.query);
                onSearchSubmit(pill.query);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-400/50 text-zinc-300 hover:text-yellow-400 transition flex items-center gap-1 active:scale-95"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex items-center justify-center border-t border-zinc-800 pt-6">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
