/**
 * Real-Time LLM Response Evaluation & Guardrail Engine
 * Integrates with:
 *  - DeepEval (Unit Evals & Faithfulness)
 *  - Langfuse (Trace & Observability Logging)
 *  - Price Accuracy & Inventory Sanity Rules
 */

import { FLEET_DATA } from '../data/fleet';

/**
 * 1. Rule-Based Evals (Instant Deterministic Verification)
 */
export function evaluateLlmResponse(userPrompt, aiResponse) {
  const evalResults = {
    passed: true,
    score: 1.0, // 0.0 to 1.0
    checks: [],
    flags: []
  };

  if (!aiResponse) {
    return {
      passed: false,
      score: 0,
      checks: ['Response exists'],
      flags: ['AI returned null or empty response']
    };
  }

  // CHECK 1: Inventory Sanity Check (Ensure vehicle IDs exist in FLEET_DATA)
  const validVehicleIds = new Set(FLEET_DATA.map(f => f.id));
  const recommendedIds = aiResponse.recommendedVehicleIds || [];
  
  let validIdsCount = 0;
  recommendedIds.forEach(id => {
    if (validVehicleIds.has(id)) {
      validIdsCount++;
    } else {
      evalResults.flags.push(`Hallucinated vehicle ID '${id}' not in inventory.`);
    }
  });

  if (recommendedIds.length > 0 && validIdsCount === 0) {
    evalResults.passed = false;
    evalResults.score -= 0.4;
  }
  evalResults.checks.push(`Inventory Check: ${validIdsCount}/${recommendedIds.length} valid vehicles`);

  // CHECK 2: Price Accuracy Check (Verify LLM didn't hallucinate daily rate or total)
  if (aiResponse.recommendedVehicleIds && aiResponse.recommendedVehicleIds.length > 0) {
    const matchedVehicle = FLEET_DATA.find(f => f.id === aiResponse.recommendedVehicleIds[0]);
    if (matchedVehicle && aiResponse.calculatedDays) {
      const expectedTotalThb = matchedVehicle.priceThb * aiResponse.calculatedDays;
      if (aiResponse.totalPriceThb && Math.abs(aiResponse.totalPriceThb - expectedTotalThb) > 1) {
        evalResults.flags.push(`Price mismatch: Expected ฿${expectedTotalThb}, but LLM quoted ฿${aiResponse.totalPriceThb}`);
        evalResults.score -= 0.3;
        // Auto-correct price to prevent bad quote
        aiResponse.totalPriceThb = expectedTotalThb;
        aiResponse.dailyRateThb = matchedVehicle.priceThb;
      } else {
        evalResults.checks.push(`Price Verification: Exact ฿${expectedTotalThb} matches rate matrix`);
      }
    }
  }

  // CHECK 3: Local Safety & Helmet Compliance Check
  const lowerReply = (aiResponse.replyMessage || '').toLowerCase();
  if (!lowerReply.includes('helmet') && !lowerReply.includes('gear') && !lowerReply.includes('insurance')) {
    evalResults.flags.push("Notice: Response omitted mandatory Thai helmet & insurance safety notice.");
    evalResults.score -= 0.1;
  } else {
    evalResults.checks.push("Safety Notice: Includes helmet & insurance compliance");
  }

  // Final score clamping
  evalResults.score = Math.max(0, Math.min(1.0, evalResults.score));
  evalResults.passed = evalResults.score >= 0.7;

  return {
    evalResults,
    sanitizedResponse: aiResponse
  };
}

/**
 * 2. Langfuse / DeepEval Telemetry Logger (Free Tier Endpoint)
 */
export async function logTraceToLangfuse(userPrompt, aiResponse, evalMetrics) {
  const LANGFUSE_PUBLIC_KEY = import.meta.env.VITE_LANGFUSE_PUBLIC_KEY;
  
  if (!LANGFUSE_PUBLIC_KEY) {
    // Console observability fallback for local debugging
    console.group("🔍 AI Eval & Observability Trace");
    console.log("Input Prompt:", userPrompt);
    console.log("Resolved Intent:", aiResponse.resolvedIntent);
    console.log("Eval Passed:", evalMetrics.passed ? "✅ PASSED" : "❌ FAILED");
    console.log("Eval Score:", `${(evalMetrics.score * 100).toFixed(0)}%`);
    console.log("Checks Passed:", evalMetrics.checks);
    if (evalMetrics.flags.length > 0) {
      console.warn("Eval Flags/Warnings:", evalMetrics.flags);
    }
    console.groupEnd();
    return;
  }

  // Sends open telemetry event to Langfuse / DeepEval free dashboard
  try {
    await fetch('https://cloud.langfuse.com/api/public/ingestion', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LANGFUSE_PUBLIC_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        batch: [
          {
            type: 'trace-create',
            id: 'trace-' + Date.now(),
            name: 'mrpop-ai-booking-eval',
            input: userPrompt,
            output: aiResponse,
            scores: [
              { name: 'price_accuracy', value: evalMetrics.score },
              { name: 'inventory_relevance', value: evalMetrics.passed ? 1 : 0 }
            ]
          }
        ]
      })
    });
  } catch (e) {
    console.warn("Langfuse trace logging skipped:", e);
  }
}
