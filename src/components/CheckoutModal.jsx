import React, { useState, useRef } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, PenTool, Download, ShieldCheck, Sparkles, MapPin, Calendar, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ vehicle, verifiedDoc, currency, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('promptpay'); // 'promptpay' or 'card'
  const [days, setDays] = useState(3);
  const [pickupLocation, setPickupLocation] = useState('Nimman Branch (Soi 9)');
  const [isSigned, setIsSigned] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const totalThb = vehicle.priceThb * days;
  const totalUsd = vehicle.priceUsd * days;
  const depositThb = vehicle.depositThb;

  // Signature canvas handlers
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setIsSigned(true);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleCompletePayment = () => {
    setIsPaid(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isPaid ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  E-Signature & Instant Checkout
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-normal">
                    Step 2 of 2
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Verified Renter: <span className="text-emerald-300 font-bold">{verifiedDoc?.details?.fullName || 'Valued Guest'}</span>
                </p>
              </div>
            </div>

            {/* Rental Summary Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs mb-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-sm">{vehicle.name}</h4>
                  <p className="text-slate-400">{vehicle.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-rose-400">
                    {currency === 'THB' ? `฿${totalThb}` : `$${totalUsd}`}
                  </span>
                  <p className="text-[11px] text-slate-400">for {days} days</p>
                </div>
              </div>

              {/* Rental Options inputs */}
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div>
                  <label className="text-slate-500 font-semibold block mb-1">Rental Duration:</label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value={1}>1 Day (฿{vehicle.priceThb})</option>
                    <option value={3}>3 Days (฿{vehicle.priceThb * 3})</option>
                    <option value={5}>5 Days (฿{vehicle.priceThb * 5})</option>
                    <option value={7}>7 Days (฿{vehicle.priceThb * 7})</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-500 font-semibold block mb-1">Pickup Point:</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Nimman Branch (Soi 9)">Nimman Branch (Soi 9)</option>
                    <option value="Old City Moat Shop">Old City Moat Shop</option>
                    <option value="Chiang Mai Airport CNX Delivery">CNX Airport Delivery (+200฿)</option>
                    <option value="Hotel Delivery (Chiang Mai City)">Hotel Delivery (+150฿)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* E-Signature Canvas */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-rose-400" /> Digital E-Signature (Sign Rental Terms below)
                </label>
                <button
                  onClick={clearSignature}
                  className="text-[11px] text-slate-400 hover:text-rose-300 underline"
                >
                  Clear Signature
                </button>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden h-28 cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={112}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-full"
                />
                {!isSigned && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs italic">
                    Draw signature here with mouse or finger...
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                By signing, you agree to helmet laws, 100% insurance terms, and ฿{depositThb} refundable deposit policy.
              </p>
            </div>

            {/* Payment Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-200 block mb-2">Select Payment Method:</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    paymentMethod === 'promptpay'
                      ? 'bg-rose-500/10 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">PromptPay QR (Thai Banking)</div>
                    <div className="text-[10px] text-slate-400">Instant 0% Fee Local Pay</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    paymentMethod === 'card'
                      ? 'bg-rose-500/10 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Credit Card (Stripe)</div>
                    <div className="text-[10px] text-slate-400">Visa / Mastercard / Apple Pay</div>
                  </div>
                </button>
              </div>

              {/* PromptPay QR Display */}
              {paymentMethod === 'promptpay' && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-xl shadow-lg mb-2">
                    {/* Simulated PromptPay QR SVG */}
                    <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white"/>
                      <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20Z" fill="#000"/>
                      <path d="M60 10H90V40H60V10ZM70 20V30H80V20H70Z" fill="#000"/>
                      <path d="M10 60H40V90H10V60ZM20 70V80H30V70H20Z" fill="#000"/>
                      <rect x="45" y="45" width="10" height="10" fill="#000"/>
                      <rect x="65" y="65" width="20" height="20" fill="#000"/>
                      <rect x="50" y="20" width="5" height="15" fill="#000"/>
                      <rect x="20" y="50" width="15" height="5" fill="#000"/>
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-emerald-400">Scan with any Thai Banking App</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">Amount: ฿{totalThb} THB</p>
                  <button
                    onClick={() => {
                      setCopiedQr(true);
                      setTimeout(() => setCopiedQr(false), 2000);
                    }}
                    className="mt-2 text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    {copiedQr ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedQr ? 'PromptPay ID Copied!' : 'Copy PromptPay Account ID'}
                  </button>
                </div>
              )}

              {/* Stripe Card Mock */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Card Number:</label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Expiry Date:</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">CVC:</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Final Payment */}
            <button
              onClick={handleCompletePayment}
              disabled={!isSigned}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition shadow-xl flex items-center justify-center gap-2 ${
                isSigned
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/20 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {isSigned
                  ? `Confirm & Complete Payment (฿${totalThb})`
                  : 'Please Sign Agreement Above First'}
              </span>
            </button>
          </div>
        ) : (
          /* Confirmation Success Voucher */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="text-2xl font-extrabold text-white">Booking Confirmed! 🎉</h2>
            <p className="text-xs text-emerald-400 font-semibold mt-1">
              Reservation ID: #POP-{Math.floor(100000 + Math.random() * 900000)}
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2 font-bold text-white">
                <span>{vehicle.name}</span>
                <span className="text-emerald-400">฿{totalThb} Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Location:</span>
                <span className="font-semibold text-white">{pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-white">{days} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-semibold text-white">{verifiedDoc?.details?.fullName || 'Valued Guest'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Included Accessories:</span>
                <span className="font-semibold text-emerald-400">2 Helmets + Phone Mount</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              A copy of your signed rental agreement and pickup voucher has been sent to your email.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Rental Voucher
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition shadow-lg shadow-rose-500/20"
              >
                Done & Return Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
