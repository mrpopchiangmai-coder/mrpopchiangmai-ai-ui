import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ConversationalSearch from './components/ConversationalSearch';
import VehicleCard from './components/VehicleCard';
import VisionAiVerification from './components/VisionAiVerification';
import CheckoutModal from './components/CheckoutModal';
import LlmTxtModal from './components/LlmTxtModal';
import { FLEET_DATA } from './data/fleet';
import { Sparkles, Bot, ShieldCheck, MapPin, Phone, HelpCircle, Heart, Star, Compass } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currency, setCurrency] = useState('THB'); // 'THB' or 'USD'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState(null);

  // Modal states
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [verifiedDoc, setVerifiedDoc] = useState(null);
  const [step, setStep] = useState(null); // 'vision-ai' | 'checkout' | null
  const [showLlmModal, setShowLlmModal] = useState(false);

  // AI-filtered fleet computation
  const filteredFleet = useMemo(() => {
    return FLEET_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // Query filter matching name, specs, or suitability
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.suitability.toLowerCase().includes(q) ||
        item.badges.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  // AI search submission simulation
  const handleSearchSubmit = (overrideQuery) => {
    const q = overrideQuery !== undefined ? overrideQuery : query;
    if (!q.trim()) {
      setAiInterpretation(null);
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Smart intent generation
      const lower = q.toLowerCase();
      if (lower.includes('mountain') || lower.includes('suthep') || lower.includes('abs')) {
        setAiInterpretation("Resolved Intent: Mountain touring in Chiang Mai. Filtering for 155cc+ maxi-scooters with ABS and hill climb power.");
      } else if (lower.includes('old city') || lower.includes('temple') || lower.includes('125cc')) {
        setAiInterpretation("Resolved Intent: Lightweight urban commuting around Old City. Surfacing agile 125cc scooters with easy parking.");
      } else if (lower.includes('car') || lower.includes('family') || lower.includes('airport')) {
        setAiInterpretation("Resolved Intent: Airport pickup (CNX) or family group. Showing air-conditioned compact cars and 7-seater SUVs.");
      } else if (lower.includes('pai') || lower.includes('loop') || lower.includes('500cc')) {
        setAiInterpretation("Resolved Intent: Long-distance adventure touring (Mae Hong Son Loop / Pai). Showing 500cc twin-cylinder adventure tourers.");
      } else {
        setAiInterpretation(`Resolved Intent: Searching Chiang Mai fleet matching '${q}' with live availability.`);
      }
    }, 600);
  };

  // Launch booking pipeline
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setStep('vision-ai');
  };

  // Handle document verification success
  const handleDocumentVerified = (docData) => {
    setVerifiedDoc(docData);
    setStep('checkout');
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Sticky Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        onOpenLlmTxt={() => setShowLlmModal(true)}
      />

      {/* Hero & AI Conversational Bar */}
      <ConversationalSearch
        query={query}
        setQuery={setQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onSearchSubmit={handleSearchSubmit}
        isAnalyzing={isAnalyzing}
        aiInterpretation={aiInterpretation}
      />

      {/* Main Vehicle Fleet Stream */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Stream Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Available Vehicles
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {filteredFleet.length} items
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Prices include 2 free helmets, full insurance options, and local 24/7 roadside assistance.
            </p>
          </div>

          {(query || activeCategory !== 'All') && (
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setAiInterpretation(null);
              }}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Fleet Grid */}
        {filteredFleet.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                currency={currency}
                onSelectVehicle={handleSelectVehicle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
            <Bot className="w-12 h-12 text-rose-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-white">No exact vehicle matches found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Try adjusting your AI prompt or select "All Fleet" to see available scooters, big bikes, and cars in Chiang Mai.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setAiInterpretation(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs"
            >
              Show Full Fleet
            </button>
          </div>
        )}

        {/* Why Rent with Mr. Pop AI Section */}
        <section className="mt-16 pt-10 border-t border-white/5">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-white">
              Why Choose <span className="text-rose-400">Mr. Pop Chiang Mai</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Chiang Mai's premier AI-enabled motor & car rental desk with 0 waiting time
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Conversational AI Booking</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Book instantly via natural chat or voice. No tedious date pickers or counter queues.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Vision AI Verification</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Scan your passport and International Driving Permit in seconds. Safe, secure, and hassle-free.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Airport & Hotel Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct vehicle delivery to Nimman, Old City, or Chiang Mai International Airport (CNX).
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070a12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Mr. Pop Chiang Mai Motor & Car Rental</span>
            <span>•</span>
            <span>Chiang Mai, Thailand</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLlmModal(true)}
              className="hover:text-rose-300 transition"
            >
              AI Crawl Spec (/llms.txt)
            </button>
            <span>•</span>
            <a href="https://github.com/mrpopchiangmai-coder/mrpopchiangmai-ai-ui" target="_blank" rel="noreferrer" className="hover:text-white underline">
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {step === 'vision-ai' && selectedVehicle && (
        <VisionAiVerification
          vehicle={selectedVehicle}
          currency={currency}
          onClose={() => setStep(null)}
          onVerified={handleDocumentVerified}
        />
      )}

      {step === 'checkout' && selectedVehicle && (
        <CheckoutModal
          vehicle={selectedVehicle}
          verifiedDoc={verifiedDoc}
          currency={currency}
          onClose={() => setStep(null)}
        />
      )}

      {showLlmModal && (
        <LlmTxtModal onClose={() => setShowLlmModal(false)} />
      )}

    </div>
  );
}
