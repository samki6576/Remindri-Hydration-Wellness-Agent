# Remindri-Hydration-Wellness-Agent
# 💧 Remindri — Hydration & Wellness Agent

### *Gentle AI coaching for better daily habits*

[![Live Demo]](https://remindri-hydration-wellness-agent.netlify.app/)


---

## ✨ The Problem

Students and desk workers spend hours in front of screens. They forget to drink water. They ignore early signs of dehydration — tiredness, headaches, dry lips, low focus.

**The result:** Fatigue, lower grades, reduced productivity, and long-term health issues.

---

## 🌱 The Solution

**Remindri** is an AI-powered wellness agent. You type how you feel. Remindri responds with:

| What you get | Example |
|--------------|---------|
| 💧 **Hydration recommendation** | *"Drink 8-10 oz of water. Dehydration is a common headache trigger."* |
| 🧘 **Micro-habit (30-60 sec)** | *"Close your eyes and place palms over them for 30 seconds."* |

No login. No tracking. No medical claims. Just a calm, private wellness check-in.

---

## 🎯 Impact

| Area | How Remindri Helps |
|------|---------------------|
| **Student health** | Prevents dehydration-related fatigue during study sessions |
| **Focus & productivity** | 60-second micro-habits reset attention without breaking flow |
| **Accessibility** | Works on any device, zero cost, no account needed |
| **Environment** | 100% digital — no waste, no physical products |

> Dehydration by just 1-2% can impair cognitive function, memory, and mood. *(Source: European Journal of Nutrition)*

---

## 🧠 AI Component

**Model:** Google Gemini 2.0 Flash (free tier)

**How it works:**
1. User describes symptoms in natural language
2. Remindri sends a structured prompt to Gemini
3. LLM returns two actionable suggestions (hydration + micro-habit)
4. UI displays response in a calm, glass-morphism design

**Fallback:** If API is unavailable, a smart rule-based response system activates.

---

## 🎨 Design Philosophy — "Liquid Glass"

The interface follows the hackathon's bonus criteria:

- **Frosted transparency:** `backdrop-filter: blur(16px)`
- **Light-grey components:** `rgba(245, 245, 247, 0.75)`
- **Soft rounded edges:** `border-radius: 48px`
- **Gentle shadows & borders:** White-border with low opacity

The result feels soft, approachable, and modern — like water on glass.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML5, CSS3, Vanilla JS |
| AI/LLM | Google Gemini 2.0 Flash API |
| Hosting | Vercel / Netlify |
| Styling | Liquid Glass (backdrop-filter, flexbox, responsive) |
| Version Control | Git + GitHub |

---

## 🚀 Live Demo

👉 **[Click here to try Remindri]** (YOUR_VERCEL_URL_HERE)

Test these example inputs:
- *"I feel tired and my head hurts a little"*
- *"My lips feel dry and I can't focus"*
- *"I've been studying for 3 hours straight"*

---

## 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/remindri.git

# Open the folder
cd remindri

# Launch locally (any static server works)
python -m http.server 8000
# or
npx serve .
