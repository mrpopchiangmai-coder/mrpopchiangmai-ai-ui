import React from 'react';
import { MapPin, Phone, MessageSquare, Instagram, Facebook, Video, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 text-zinc-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Mr. Pop <span className="text-yellow-400">Chiang Mai</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Since 1956 — Your trusted rider partner in Chiang Mai. Premium motorbikes, scooters, adventure bikes & touring gear for Northern Thailand.
            </p>
            <div className="text-xs text-yellow-400 font-bold uppercase tracking-wider pt-2">
              📍 19 Sridonchai Rd, Chiang Mai
            </div>
          </div>

          {/* Quick Links / Routes */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2">
              Popular Riding Routes
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-yellow-400 transition">⛰️ Doi Suthep & Samoeng Loop</li>
              <li className="hover:text-yellow-400 transition">🏔️ Mae Hong Son Loop (1,864 Curves)</li>
              <li className="hover:text-yellow-400 transition">🌄 Pai Mountain Twisties</li>
              <li className="hover:text-yellow-400 transition">🏞️ Chiang Dao Cave Route</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>+66 80 246 4381</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Every Day: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Chang Khlan, Mueang Chiang Mai</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2">
              Official Social Media
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="https://api.whatsapp.com/send?phone=66802464381"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (+66 80 246 4381)</span>
              </a>

              <a
                href="https://www.tiktok.com/@mrpopchiangmai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-yellow-400/50 transition"
              >
                <Video className="w-4 h-4 text-yellow-400" />
                <span>TikTok (@mrpopchiangmai)</span>
              </a>

              <a
                href="https://www.instagram.com/mrpopchiangmai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-yellow-400/50 transition"
              >
                <Instagram className="w-4 h-4 text-yellow-400" />
                <span>Instagram (@mrpopchiangmai)</span>
              </a>

              <a
                href="https://www.facebook.com/mrpopchiangmai1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-yellow-400/50 transition"
              >
                <Facebook className="w-4 h-4 text-yellow-400" />
                <span>Facebook (/mrpopchiangmai1)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Mr Pop Chiang Mai Rider. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-yellow-400 transition cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-yellow-400 transition cursor-pointer">Terms of Rental</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
