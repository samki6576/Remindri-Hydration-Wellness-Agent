exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { userInput, systemPrompt } = JSON.parse(event.body);
    
    // Support both naming conventions for the API key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
    
    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Missing API Key', 
          message: 'GEMINI_API_KEY is not set in Netlify environment variables.' 
        })
      };
    }

    // Using gemini-1.5-flash for maximum stability/compatibility
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: [{
        parts: [{ text: `${systemPrompt}\n\nUser feeling: ${userInput}` }]
      }]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Gemini API Rejection', 
          details: data,
          message: data.error?.message || 'Unknown error from Google'
        })
      };
    }
    
    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid Response Format', details: data })
      };
    }

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ reply: data.candidates[0].content.parts[0].text })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error', message: error.message })
    };
  }
};