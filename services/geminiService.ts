import { GoogleGenAI } from "@google/genai";
import { WizardState } from "../types";

export const generateEndorsementDetails = async (reason: string, policyRef: string) => {
  // Use process.env.API_KEY directly as per SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an insurance underwriter assistant. Generate a professional description (approx 2-3 sentences) for an insurance endorsement with the reason "${reason}" for policy ${policyRef}. Be concise and technical.`,
    });
    // Correctly accessing .text property
    return response.text?.trim() || "No suggestions available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating suggestion. Please input manually.";
  }
};

export const generateDetailedQuotation = async (data: WizardState) => {
  // Use process.env.API_KEY directly as per SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    // Correctly accessing .text property
    return response.text?.trim() || "Quotation generation failed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating quotation details. Please contact support.";
  }
};