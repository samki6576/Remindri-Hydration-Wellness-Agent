// Get your free API key: https://aistudio.google.com/app/apikey

// For CommonJS
require('dotenv').config();

// For ES Modules (import)
import 'dotenv/config';

console.log(process.env.PORT); // Outputs: 3000
console.log(process.env.API_KEY); 

const GEMINI_API_KEY = process.env.API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const symptomsInput = document.getElementById('symptoms');
const submitBtn = document.getElementById('submitBtn');
const outputCard = document.getElementById('outputCard');
const suggestionText = document.getElementById('suggestionText');
const wellnessTipDiv = document.getElementById('wellnessTip');
const resetBtn = document.getElementById('resetBtn');

// Agent prompt — ensures health coaching + micro-habit
const SYSTEM_PROMPT = `You are Remindri, a gentle wellness & hydration agent. 
User shares how they feel (e.g., tired, headache, dry lips). 
Respond in this exact format:

💧 HYDRAUTION: (suggest how much water to drink now in oz/ml, and one specific reason)
🧘 MICRO-HABIT: (a 30-60 second action — look away from screen, stretch, deep breath)

Rules:
- No medical advice, no alarms.
- Keep warm and encouraging tone.
- Under 80 words total.`;

async function getAIResponse(userInput) {
  const payload = {
    contents: [{
      parts: [{
        text: `${SYSTEM_PROMPT}\n\nUser feeling: ${userInput}`
      }]
    }]
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI error:', error);
    return "💧 Hydration: Sip 6-8 oz of water now.\n🧘 Micro-habit: Roll your shoulders 3 times slowly.";
  }
}

submitBtn.addEventListener('click', async () => {
  const userSymptoms = symptomsInput.value.trim();
  if (!userSymptoms) {
    alert('Describe how you feel — Remindri is here to help 🌿');
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>💭 Listening...</span>';
  suggestionText.innerText = '✨ Thinking...';
  wellnessTipDiv.innerText = '';
  outputCard.classList.remove('hidden');

  const aiReply = await getAIResponse(userSymptoms);
  
  // Parse response (simple split by newlines)
  const lines = aiReply.split('\n');
  let hydration = '';
  let microHabit = '';
  
  for (let line of lines) {
    if (line.includes('💧') || line.toLowerCase().includes('hydration')) {
      hydration = line;
    } else if (line.includes('🧘') || line.toLowerCase().includes('micro')) {
      microHabit = line;
    }
  }
  
  suggestionText.innerText = hydration || '💧 Sip 6-8 oz of water. Your body will thank you.';
  wellnessTipDiv.innerHTML = `🧘 ${microHabit.replace('🧘', '').trim() || 'Look away from screen for 20 seconds — blink slowly 5 times.'}`;
  
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<span>✨ Ask Remindri</span>';
});

resetBtn.addEventListener('click', () => {
  symptomsInput.value = '';
  outputCard.classList.add('hidden');
  symptomsInput.focus();
});