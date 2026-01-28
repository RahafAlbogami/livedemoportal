import { GoogleGenAI } from "@google/genai";
import { WizardState } from "../types";

// Helper function to add timeout to promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
};

export const generateEndorsementDetails = async (reason: string, policyRef: string) => {
  // Check if API key exists
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API key not found. Using fallback suggestion.");
    return `Professional endorsement modification for policy ${policyRef} based on ${reason}. This update ensures continued coverage alignment with current risk assessment parameters.`;
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    // Add 15 second timeout to prevent hanging
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an insurance underwriter assistant. Generate a professional description (approx 2-3 sentences) for an insurance endorsement with the reason "${reason}" for policy ${policyRef}. Be concise and technical.`,
      }),
      15000 // 15 seconds timeout
    );
    // Correctly accessing .text property
    return response.text?.trim() || "No suggestions available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Return fallback suggestion if API fails
    return `Professional endorsement modification for policy ${policyRef} based on ${reason}. This update ensures continued coverage alignment with current risk assessment parameters.`;
  }
};

// Helper function to add timeout to promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
};

export const generateDetailedQuotation = async (data: WizardState) => {
  // Check if API key exists
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API key not found. Using fallback quotation.");
    return `Financial Summary:
- Current Premium: 45,000 SAR
- Endorsement Additional Premium: 8,500 SAR
- Admin Fees: 500 SAR
- VAT (15%): 8,100 SAR
- Total Adjusted Premium: 62,100 SAR

Risk Assessment: Standard risk profile with moderate exposure based on property characteristics.`;
  }

  const ai = new GoogleGenAI({ apiKey });
  const propertyCount = data.properties.length;
  const prompt = `
    You are a senior insurance underwriter. Generate a CONCISE financial summary for an endorsement quotation.
    Policy Reference: ${data.policyReference}
    Properties: ${propertyCount} assets.
    
    Return a list of amounts in SAR for:
    - Current Premium
    - Endorsement Additional Premium
    - Admin Fees
    - VAT (15%)
    - Total Adjusted Premium
    
    Also include a very brief 1-sentence summary of the risk assessment.
    Format as a clear summary, not long paragraphs.
  `;

  try {
    // Add 30 second timeout to prevent hanging
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      }),
      30000 // 30 seconds timeout
    );
    // Correctly accessing .text property
    return response.text?.trim() || "Quotation generation failed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Return fallback quotation if API fails
    return `Financial Summary:
- Current Premium: 45,000 SAR
- Endorsement Additional Premium: 8,500 SAR
- Admin Fees: 500 SAR
- VAT (15%): 8,100 SAR
- Total Adjusted Premium: 62,100 SAR

Risk Assessment: Standard risk profile with moderate exposure based on property characteristics.`;
  }
};