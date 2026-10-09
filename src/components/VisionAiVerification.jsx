import React, { useState } from 'react';
import { Scan, ShieldCheck, Upload, AlertCircle, FileCheck, X, Sparkles, ArrowRight } from 'lucide-react';

export default function VisionAiVerification({ vehicle, currency, onClose, onVerified }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDoc, setScannedDoc] = useState(null);
  const [scanResults, setScanResults] = useState(null);

  const samplePassports = [
    { name: 'Alex Johnson (US Passport + IDP)', type: 'Passport + IDP', valid: true },
    { name: 'Sophie Martin (EU Driver License)', type: 'Driving License', valid: true },
    { name: 'Zhang Wei (Chinese Passport)', type: 'Passport', valid: true }
  ];

  const handleSimulatedScan = (doc) => {
    setScannedDoc(doc.name);
    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResults({
        documentType: doc.type,
        status: 'VERIFIED',
        confidence: 99.4,
        details: {
          fullName: doc.name.split(' (')[0],
          documentNo: 'P' + Math.floor(10000000 + Math.random() * 90000000),
          expiryDate: '2030-08-15',
          idpEligible: true,
          ageCheck: '24+ Years Old (Eligible for ' + vehicle.category + ')'
        },
        localGuidance: [
          ' Helmets are mandatory for driver and pillion passenger in Thailand.',
          ' Keep to the LEFT side of the road in Chiang Mai.',
          ' Beware of Old City moat one-way traffic systems.',
          ' Refundable security deposit hold required at pickup.'
        ]
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl p-6 text-zinc-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400">
            <Scan className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
              Vision AI Document Verification
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-bold">
                Step 1 of 2
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Reserving <span className="text-yellow-400 font-bold">{vehicle.name}</span> for {currency === 'THB' ? `฿${vehicle.priceThb}` : `$${vehicle.priceUsd}`}/day
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-2">
          <div className="font-bold text-yellow-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Fast Passport & Driving Permit Check
          </div>
          <p className="text-zinc-400">
            Upload or drop a clear photo of your Passport, Driver's License, or International Driving Permit (IDP). Our Vision AI instantly checks age, document validity, and riding class eligibility for Chiang Mai.
          </p>
        </div>

        {/* Scan Area / Dropzone */}
        {!scanResults && (
          <div className="space-y-4">
            <div
              onClick={() => handleSimulatedScan(samplePassports[0])}
              className="border-2 border-dashed border-zinc-700 hover:border-yellow-400 rounded-xl p-8 text-center bg-zinc-900/60 hover:bg-zinc-900 transition cursor-pointer group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white group-hover:text-yellow-400 transition uppercase tracking-wider">
                Click or Drop Document Image Here
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Supports JPG, PNG, PDF up to 10MB (Passport, IDP, or Driving License)
              </p>
            </div>

            {/* Quick Demo Document Triggers */}
            <div className="pt-2">
              <p className="text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">Or test instant Vision AI with sample documents:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {samplePassports.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulatedScan(doc)}
                    className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-400/50 text-left text-xs text-zinc-200 transition active:scale-95 flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="truncate">{doc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <div className="my-8 text-center p-8 bg-zinc-900 rounded-xl border border-yellow-400/30">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
              <Scan className="w-8 h-8 text-yellow-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-sm font-bold text-white uppercase">Vision AI Analyzing {scannedDoc}...</p>
            <p className="text-xs text-zinc-400 mt-1">Extracting document OCR, verifying liveness & Chiang Mai driving eligibility...</p>
          </div>
        )}

        {/* Verification Success Results */}
        {scanResults && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-yellow-400 text-sm flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-5 h-5 text-yellow-400" /> Document Identity Verified ({scanResults.confidence}% Confidence)
                </span>
                <span className="text-[11px] font-bold font-mono text-black bg-yellow-400 px-2 py-0.5 rounded uppercase">
                  {scanResults.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-zinc-300 mt-3 pt-3 border-t border-yellow-400/20">
                <div>
                  <span className="text-zinc-500">Holder Name:</span>
                  <p className="font-bold text-white">{scanResults.details.fullName}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Document No:</span>
                  <p className="font-mono text-white">{scanResults.details.documentNo}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Eligibility Check:</span>
                  <p className="font-bold text-yellow-400">{scanResults.details.ageCheck}</p>
                </div>
                <div>
                  <span className="text-zinc-500">IDP Status:</span>
                  <p className="font-bold text-yellow-400">Valid International Driving Class</p>
                </div>
              </div>
            </div>

            {/* Local Guidance Box */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
              <div className="font-bold text-red-500 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-red-500" /> Chiang Mai Driving Rules & Guidance:
              </div>
              <ul className="space-y-1 pl-2 text-zinc-300">
                {scanResults.localGuidance.map((rule, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-yellow-400 font-bold">•</span> {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Proceed to Payment Action */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setScanResults(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-bold hover:bg-zinc-800 transition"
              >
                Re-scan
              </button>
              <button
                onClick={() => onVerified(scanResults)}
                className="flex-1 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Proceed to E-Signature & PromptPay Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
