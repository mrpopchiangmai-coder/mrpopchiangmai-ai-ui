import React, { useState } from 'react';
import { ShieldCheck, Zap, Info, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function VehicleCard({ vehicle, currency, onSelectVehicle }) {
  const [showSpecs, setShowSpecs] = useState(false);

  const price = currency === 'THB' ? `฿${vehicle.priceThb}` : `$${vehicle.priceUsd}`;
  const period = ' / day';

  return (
    <div className="group relative bg-[#141414] rounded-2xl border border-zinc-800 hover:border-yellow-400/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-yellow-400/10">
      
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>

        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-yellow-400 border border-yellow-400/30 uppercase tracking-wider">
          {vehicle.category}
        </span>

        {/* Popular / Best Choice Badge */}
        {vehicle.popular && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-bold shadow-lg shadow-red-600/30 flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-yellow-400" /> Rider Favorite
          </span>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-black text-white group-hover:text-yellow-400 transition uppercase tracking-tight">
              {vehicle.name}
            </h3>
            <p className="text-xs text-zinc-400 font-medium">{vehicle.type}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-yellow-400 tracking-tight">{price}</span>
            <span className="text-xs text-zinc-400">{period}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Highlights & Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {vehicle.badges.map((badge, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 text-yellow-400 font-bold border border-yellow-400/20"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Suitability text */}
          <p className="text-xs text-zinc-300 leading-relaxed mb-4 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
            💡 {vehicle.suitability}
          </p>
        </div>

        {/* Specs Accordion Toggle */}
        <div>
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="w-full text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-between py-1.5 border-t border-zinc-800 mb-3"
          >
            <span className="font-bold text-yellow-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-yellow-400" /> Vehicle Specs & Terms
            </span>
            {showSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Specs Details List */}
          {showSpecs && (
            <div className="mb-4 text-xs text-zinc-300 space-y-1.5 bg-zinc-950 p-3 rounded-lg border border-zinc-800 animate-fadeIn">
              <div className="flex justify-between">
                <span className="text-zinc-500">Engine:</span>
                <span className="font-medium text-zinc-200">{vehicle.specs.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Transmission:</span>
                <span className="font-medium text-zinc-200">{vehicle.specs.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Brakes & Safety:</span>
                <span className="font-medium text-zinc-200">{vehicle.specs.brakes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Included Gear:</span>
                <span className="font-medium text-yellow-400">{vehicle.specs.helmets}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-zinc-800">
                <span className="text-zinc-500">Refundable Deposit:</span>
                <span className="font-bold text-red-500">
                  {currency === 'THB' ? `฿${vehicle.depositThb}` : `$${Math.round(vehicle.depositThb / 35)}`}
                </span>
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-400/20 active:scale-98 transition flex items-center justify-center gap-2 group/btn"
          >
            <Zap className="w-4 h-4 text-black fill-black group-hover/btn:animate-pulse" />
            <span>Instant Book & Fast AI Verification</span>
          </button>
        </div>

      </div>

    </div>
  );
}
