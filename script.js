const symptomsInput = document.getElementById('symptoms');
const submitBtn = document.getElementById('submitBtn');
const outputCard = document.getElementById('outputCard');
const suggestionText = document.getElementById('suggestionText');
const wellnessTipDiv = document.getElementById('wellnessTip');
const resetBtn = document.getElementById('resetBtn');

const SYSTEM_PROMPT = `You are Remindri, a gentle wellness & hydration agent. 
User shares how they feel (e.g., tired, headache, dry lips). 
Respond in this exact format:

💧 HYDRATION: (suggest how much water to drink now in oz/ml, and one specific reason)
🧘 MICRO-HABIT: (a 30-60 second action — look away from screen, stretch, deep breath)

Rules:
- No medical advice, no alarms.
- Keep warm and encouraging tone.
- Under 80 words total.`;

async function getAIResponse(userInput) {
  try {
    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInput: userInput,
        systemPrompt: SYSTEM_PROMPT
      })
    });
    
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('AI error:', error);
    return "💧 Hydration: Sip 6-8 oz of water now.\n🧘 Micro-habit: Roll your shoulders 3 times slowly.";
  }
}

// Rest of your existing code remains the same...
submitBtn.addEventListener('click', async () => {
  const userSymptoms = symptomsInput.value.trim();
  if (!userSymptoms) {
    alert('Describe how you feel — Remindri is here to help 🌿');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>💭 Listening...</span>';
  suggestionText.innerText = '✨ Thinking...';
  wellnessTipDiv.innerText = '';
  outputCard.classList.remove('hidden');

  const aiReply = await getAIResponse(userSymptoms);
  
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