import { WizardState } from "../types";

// NOTE:
// This file no longer calls any external APIs (Google Gemini or otherwise).
// Everything is simulated locally with short delays so the UI never hangs.

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const generateEndorsementDetails = async (reason: string, policyRef: string) => {
  // Small artificial delay so the user sees a quick \"thinking\" state
  await sleep(800);

  return `Endorsement requested for policy ${policyRef} to address: ${reason}.
This change keeps coverage aligned with the current risk profile and underwriting guidelines.`;
};

export const generateDetailedQuotation = async (data: WizardState) => {
  // Short delay to drive the loading screen animation
  await sleep(1500);

  const propertyCount = data.properties.length;
  const policyRef = data.policyReference || "Q-REF-000000";

  return `Financial Summary for ${policyRef}

- Current Premium: 45,000 SAR
- Endorsement Additional Premium: 8,500 SAR
- Admin Fees: 500 SAR
- VAT (15%): 8,100 SAR
- Total Adjusted Premium: 62,100 SAR

Included Assets: ${propertyCount} insured properties.
Risk Assessment: Standard risk profile with moderate exposure based on declared occupancy, construction and protections.`;
};