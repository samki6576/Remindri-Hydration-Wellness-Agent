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

    // Using gemini-pro as it is the most widely available legacy model
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
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
      // If we get a 404, let's try to list models to see what is available
      const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
      const listData = await listResponse.json().catch(() => ({}));

      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Gemini API Rejection', 
          message: data.error?.message || 'Unknown error',
          availableModels: listData.models?.map(m => m.name) || 'Could not list models'
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