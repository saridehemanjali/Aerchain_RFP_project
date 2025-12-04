const { OpenAI } = require('openai');
const config = require('../config');

const openai = new OpenAI({
  apiKey: config.AI.OPENAI_API_KEY,
});

// Parse natural language input into structured RFP
const parseNaturalLanguageRFP = async (naturalLanguageInput) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert procurement assistant. Parse natural language RFP requirements into structured JSON format with these fields:
          {
            title: string,
            requirements: [string array],
            budget: { amount: number, currency: string },
            deadline: ISO date string or null,
            deliveryDate: ISO date string or null,
            paymentTerms: string,
            warranty: string,
            specifications: object
          }`,
        },
        {
          role: 'user',
          content: naturalLanguageInput,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error parsing natural language RFP:', error);
    throw error;
  }
};

// Parse vendor email response into structured proposal data
const parseVendorResponse = async (emailContent, emailSubject, vendorName) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert at extracting structured data from vendor proposal emails. 
          Extract and return JSON with these fields:
          {
            vendorName: string,
            pricing: { totalPrice: number, currency: string, breakdown: object },
            deliveryDate: ISO date string or null,
            paymentTerms: string,
            warranty: string,
            additionalTerms: string,
            completeness: number (0-100),
            highlights: [string array],
            concerns: [string array]
          }`,
        },
        {
          role: 'user',
          content: `Email Subject: ${emailSubject}\n\nEmail Body:\n${emailContent}`,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error parsing vendor response:', error);
    throw error;
  }
};

// Generate comparison and recommendation for proposals
const generateProposalComparison = async (rfpData, proposals) => {
  try {
    const proposalSummary = proposals
      .map(
        (p) =>
          `Vendor: ${p.vendorName}\nPrice: ${p.pricing?.totalPrice || 'N/A'}\nTerms: ${p.paymentTerms || 'N/A'}\nWarranty: ${p.warranty || 'N/A'}`
      )
      .join('\n\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert procurement consultant. Analyze vendor proposals and provide:
          1. A comparison summary
          2. Scoring (0-100) for each vendor
          3. A recommendation with reasoning
          Return JSON with format:
          {
            summary: string,
            scoredVendors: [{vendorName: string, score: number, reasoning: string}],
            recommendation: {vendorName: string, reasoning: string, riskFactors: [string]}
          }`,
        },
        {
          role: 'user',
          content: `RFP Requirements: ${JSON.stringify(rfpData)}\n\nProposals:\n${proposalSummary}`,
        },
      ],
      temperature: 0.5,
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating comparison:', error);
    throw error;
  }
};

module.exports = {
  parseNaturalLanguageRFP,
  parseVendorResponse,
  generateProposalComparison,
};
