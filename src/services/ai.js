/**
 * Enhanced AI Assistant with Date Math & Dynamic Price Calculation
 * Handles:
 *  - Specific vehicle matching ("Honda Click", "Scrambler 400")
 *  - Explicit duration ("for 5 days")
 *  - Date ranges ("from 19-25 Oct" -> 6 days)
 *  - Total price calculation & deposit breakdown
 */

import { FLEET_DATA } from '../data/fleet';

const SYSTEM_PROMPT = `
You are the AI Price Calculator & Booking Assistant for "Mr. Pop Chiang Mai Motorbike Rental" (est. 1956).

Fleet Rates & Deposit Rules:
${JSON.stringify(FLEET_DATA.map(f => ({
  id: f.id,
  name: f.name,
  category: f.category,
  priceThbPerDay: f.priceThb,
  priceUsdPerDay: f.priceUsd,
  depositThb: f.depositThb
})), null, 2)}

Your Tasks:
1. Identify the requested vehicle (e.g. "Honda Click", "Triumph Scrambler 400").
2. Calculate the total rental days:
   - If user gives days ("5 days") -> days = 5.
   - If user gives dates ("19-25 Oct") -> calculate difference (25 - 19 = 6 days).
3. Compute total price: (priceThbPerDay * days) THB.
4. Return JSON response with exact calculation breakdown.

JSON Output Format:
{
  "requestedVehicle": "Triumph Scrambler 400X",
  "calculatedDays": 6,
  "dailyRateThb": 900,
  "totalPriceThb": 5400,
  "totalPriceUsd": 154,
  "refundableDepositThb": 3000,
  "resolvedIntent": "Calculated 6 days rental (19-25 Oct) for Triumph Scrambler 400X at ฿900/day = ฿5,400 THB.",
  "matchedCategory": "Adventure Bikes",
  "recommendedVehicleIds": ["triumph-scrambler-400"],
  "replyMessage": "The Triumph Scrambler 400X for 6 days (Oct 19–25) is ฿5,400 THB total (฿900/day). Refundable deposit is ฿3,000 THB. Includes 2 free helmets & full insurance!"
}
`;

export async function queryFreeTierLlm(userPrompt, apiKey = null) {
  const lower = userPrompt.toLowerCase();

  // --- 1. DATED & DURATION REGEX MATH (Client-side fast calculation) ---
  let calculatedDays = 1;
  let dateNote = '';

  // Check explicit days e.g., "5 days", "for 5 days", "5d"
  const daysMatch = lower.match(/(\d+)\s*(?:days?|d\b)/);
  if (daysMatch) {
    calculatedDays = parseInt(daysMatch[1], 10);
  } else {
    // Check date ranges e.g. "19-25 oct", "19 to 25 oct", "oct 19-25"
    const dateRangeMatch = lower.match(/(\d{1,2})\s*(?:-|to|\s+)\s*(\d{1,2})\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?/);
    if (dateRangeMatch) {
      const startDay = parseInt(dateRangeMatch[1], 10);
      const endDay = parseInt(dateRangeMatch[2], 10);
      if (endDay > startDay) {
        calculatedDays = endDay - startDay;
        dateNote = ` (${startDay}–${endDay} Oct)`;
      }
    }
  }

  // Ensure days is reasonable
  if (calculatedDays <= 0 || isNaN(calculatedDays)) calculatedDays = 1;

  // --- 2. GROQ FREE-TIER API CALL (If API Key provided) ---
  const GROQ_API_KEY = apiKey || import.meta.env.VITE_GROQ_API_KEY;
  if (GROQ_API_KEY) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        })
      });

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      return {
        ...result,
        calculatedDays: result.calculatedDays || calculatedDays
      };
    } catch (err) {
      console.warn("Groq API fallback to client calculation:", err);
    }
  }

  // --- 3. DETERMINISTIC CLIENT-SIDE VEHICLE & PRICE CALCULATOR ---
  let matchedVehicle = FLEET_DATA[0]; // Default Click 125
  let category = 'All';

  if (lower.includes('scrambler') || lower.includes('triumph') || lower.includes('400')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'triumph-scrambler-400') || FLEET_DATA[3];
    category = 'Adventure Bikes';
  } else if (lower.includes('click') || lower.includes('125')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'honda-click-125') || FLEET_DATA[6];
    category = 'City Scooters';
  } else if (lower.includes('nmax') || lower.includes('155')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'yamaha-nmax-155') || FLEET_DATA[4];
    category = 'Premium Scooters';
  } else if (lower.includes('v-strom') || lower.includes('vstrom') || lower.includes('800')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'suzuki-vstrom-800de') || FLEET_DATA[0];
    category = 'Adventure Bikes';
  } else if (lower.includes('transalp') || lower.includes('750')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'honda-transalp-750') || FLEET_DATA[1];
    category = 'Adventure Bikes';
  } else if (lower.includes('ninja') || lower.includes('500')) {
    matchedVehicle = FLEET_DATA.find(v => v.id === 'kawasaki-ninja-500') || FLEET_DATA[8];
    category = 'Sports Bikes';
  }

  const totalThb = matchedVehicle.priceThb * calculatedDays;
  const totalUsd = Math.round(matchedVehicle.priceUsd * calculatedDays);

  const intent = `Calculated ${calculatedDays} day${calculatedDays > 1 ? 's' : ''}${dateNote} rental for ${matchedVehicle.name} @ ฿${matchedVehicle.priceThb}/day = ฿${totalThb.toLocaleString()} THB ($${totalUsd} USD).`;

  const reply = `The ${matchedVehicle.name} for ${calculatedDays} day${calculatedDays > 1 ? 's' : ''}${dateNote} is ฿${totalThb.toLocaleString()} THB total (฿${matchedVehicle.priceThb}/day). Refundable deposit is ฿${matchedVehicle.depositThb.toLocaleString()} THB. Includes 2 free helmets & full insurance!`;

  return {
    requestedVehicle: matchedVehicle.name,
    calculatedDays: calculatedDays,
    dailyRateThb: matchedVehicle.priceThb,
    totalPriceThb: totalThb,
    totalPriceUsd: totalUsd,
    refundableDepositThb: matchedVehicle.depositThb,
    resolvedIntent: intent,
    matchedCategory: category,
    recommendedVehicleIds: [matchedVehicle.id],
    replyMessage: reply
  };
}
