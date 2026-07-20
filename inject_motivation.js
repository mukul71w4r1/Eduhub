const fs = require('fs');

const indexHtml = 'd:\\mini project E-learning\\index.html';
const styleCss = 'd:\\mini project E-learning\\styles.css';
const scriptJs = 'd:\\mini project E-learning\\script.js';

let html = fs.readFileSync(indexHtml, 'utf-8');
let css = fs.readFileSync(styleCss, 'utf-8');
let js = fs.readFileSync(scriptJs, 'utf-8');

// 1. INJECT HTML HTML HTML HTML
const motivationHTML = `
    <!-- Motivation & Wellness Hub -->
    <section id="motivation" class="motivation-module section-container" style="margin-top: 40px;">
      <!-- Daily Motivation -->
      <div class="motivation-hero" style="position:relative; border-radius: 20px; overflow: hidden; color: white; margin-bottom: 30px; text-align: center; padding: 60px 20px; background: linear-gradient(135deg, rgba(80,28,88,0.9), rgba(172,77,164,0.9));">
        <h1>Feeling Stuck? You're Not Alone 💪</h1>
        <p>Every successful student has faced doubts. Here's how to bounce back.</p>
      </div>

      <div class="daily-inspiration" style="display:flex; flex-wrap:wrap; gap:20px; margin-bottom:40px;">
        <div class="quote-of-the-day" style="flex:1; background:var(--light-gray); padding:30px; border-radius:15px;">
          <div class="quote-icon" style="font-size:30px; margin-bottom:10px;">💡</div>
          <blockquote id="dailyQuote" style="font-size:20px; font-style:italic; margin-bottom:15px; color:var(--deep-purple);">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </blockquote>
          <cite style="font-weight:bold;">— Winston Churchill</cite>
          <br><br>
          <button class="share-quote-btn cta-btn" style="padding:10px 20px; border:none; background:var(--primary-purple); color:white; border-radius:20px; cursor:pointer;">Share This Quote 📤</button>
        </div>
        
        <div class="motivation-stats" style="flex:1; display:flex; flex-direction:column; gap:15px;">
          <div class="stat-card" style="background:var(--white); padding:20px; border-radius:15px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            <h3 style="margin-bottom:10px;">🔥 Study Streak</h3>
            <p class="streak-number" style="font-size:24px; font-weight:bold; color:var(--warning-orange);">7 Days</p>
            <p class="streak-encourage">Keep it up! 3 more for a record 🏆</p>
          </div>
        </div>
      </div>

      <!-- Mood Tracker -->
      <div class="mood-tracker-section" style="background:var(--white); padding:30px; border-radius:20px; margin-bottom:40px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h2>How Are You Feeling Today? 🌈</h2>
        <p>Track your mood and get personalized support</p>
        
        <div class="mood-selector">
          <button class="mood-btn" data-mood="great"><span class="mood-emoji">😄</span><p>Great</p></button>
          <button class="mood-btn" data-mood="good"><span class="mood-emoji">🙂</span><p>Good</p></button>
          <button class="mood-btn" data-mood="okay"><span class="mood-emoji">😐</span><p>Okay</p></button>
          <button class="mood-btn" data-mood="stressed"><span class="mood-emoji">😰</span><p>Stressed</p></button>
          <button class="mood-btn" data-mood="sad"><span class="mood-emoji">😢</span><p>Sad</p></button>
          <button class="mood-btn" data-mood="overwhelmed"><span class="mood-emoji">😣</span><p>Overwhelmed</p></button>
        </div>
        
        <div class="mood-response" id="moodResponse" style="display: none;"></div>
      </div>

      <!-- Wellness Tools -->
      <div class="wellness-tools" style="margin-bottom:40px;">
        <h2>Take a Break - You Deserve It 🧘</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-top:20px;">
          <div class="pomodoro-timer" style="background:white; padding:30px; border-radius:20px; text-align:center; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
            <h3>Study Timer (Pomodoro)</h3>
            <div class="timer-display" style="font-size:48px; font-weight:bold; margin:20px 0; color:var(--primary-purple);">
              <span id="timerMinutes">25</span>:<span id="timerSeconds">00</span>
            </div>
            <div class="timer-controls" style="display:flex; justify-content:center; gap:10px;">
              <button id="startTimer" class="timer-btn" style="padding:10px 20px; background:var(--primary-purple); color:white; border:none; border-radius:20px;">Start</button>
              <button id="pauseTimer" class="timer-btn" style="padding:10px 20px; background:var(--light-gray); border:none; border-radius:20px;">Pause</button>
            </div>
          </div>
          <div class="quick-exercises" style="background:white; padding:30px; border-radius:20px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
            <h3>Quick Stress Busters</h3>
            <div class="exercise-card" style="margin-top:15px; padding:15px; background:var(--light-gray); border-radius:10px; display:flex; align-items:center; gap:15px;">
              <span class="exercise-icon" style="font-size:24px;">🧘</span>
              <div style="flex:1;">
                <h4 style="margin:0;">Breathing Exercise</h4>
                <p style="margin:5px 0 0; font-size:12px;">4-7-8 technique</p>
              </div>
              <button id="openBreathingModal" style="padding:8px 15px; background:var(--primary-purple); color:white; border:none; border-radius:15px; cursor:pointer;">Start</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Breathing Exercise Modal -->
      <div class="modal-overlay hidden" id="breathingModal">
        <div class="modal-content" style="text-align:center;">
          <button id="closeBreathing" class="close-btn">&times;</button>
          <h2>4-7-8 Breathing Technique 🌬️</h2>
          <div class="breathing-circle">
            <div class="circle-animation"></div>
            <p class="breathing-instruction" id="breathingInstruction">Get Ready...</p>
          </div>
          <button id="startBreathing" class="start-btn" style="margin-top:20px; padding:15px 30px; background:var(--primary-purple); color:white; border:none; border-radius:25px; cursor:pointer; font-weight:bold;">Begin Exercise</button>
        </div>
      </div>



      <!-- Emergency Resources -->
      <div class="emergency-resources" style="background:#fff5f5; padding:30px; border-radius:20px; border:3px solid #ff6b6b; margin-bottom:40px;">
        <h2>⚠️ Feeling Overwhelmed? Get Immediate Help</h2>
        <div class="helpline-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:15px; margin-top:20px;">
          <div class="helpline-card urgent"><span class="helpline-icon">📞</span><h3>iCall Helpline</h3><a href="tel:9152987821" class="call-btn">Call: 9152987821</a></div>
          <div class="helpline-card"><span class="helpline-icon">💬</span><h3>Vandrevala Foundation</h3><a href="tel:18602662345" class="call-btn">Call: 1860 2662 345</a></div>
        </div>
      </div>
    </section>
`;
if (!html.includes('id="motivation"')) {
  html = html.replace('<!-- Footer -->', motivationHTML + '\n    <!-- Footer -->');
}

// 2. INJECT CSS CSS CSS CSS
const motivationCSS = `
/* Mood Tracker */
.mood-selector { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 16px; margin: 24px 0; }
.mood-btn { background: white; border: 3px solid #e0e0e0; border-radius: 20px; padding: 20px; cursor: pointer; transition: all 0.3s ease; text-align: center; }
.mood-btn:hover { border-color: #813287; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(129, 50, 135, 0.2); }
.mood-emoji { font-size: 48px; display: block; margin-bottom: 8px; }

/* Mood Response Cards */
.mood-card { background: linear-gradient(135deg, #f8f0f9, #fff); border-left: 5px solid #813287; border-radius: 16px; padding: 24px; margin: 24px 0; animation: slideIn 0.5s ease; }
.mood-card.overwhelmed, .mood-card.sad { border-left-color: #ff6b6b; background: linear-gradient(135deg, #fff5f5, #fff); }
.mood-card.stressed { border-left-color: #ffa500; background: linear-gradient(135deg, #fff8f0, #fff); }
.urgent-help { background: #ffe0e0; border: 2px dashed #ff6b6b; border-radius: 12px; padding: 16px; margin-top: 16px; text-align: center; }
.emergency-btn { display: inline-block; background: #ff6b6b; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; margin: 8px; font-weight: 600; transition: transform 0.2s; }
.emergency-btn:hover { transform: scale(1.05); background: #ff5252; }

/* Breathing Exercise */
.breathing-circle { width: 300px; height: 300px; margin: 40px auto; position: relative; display: flex; align-items: center; justify-content: center; }
.circle-animation { width: 200px; height: 200px; border-radius: 50%; background: linear-gradient(135deg, #813287, #ac4da4); position: absolute; transition: all ease-in-out; }
.circle-animation.inhale { animation: inhale 4s ease-in-out forwards; }
.circle-animation.hold { animation: hold 7s ease-in-out forwards; }
.circle-animation.exhale { animation: exhale 8s ease-in-out forwards; }
@keyframes inhale { from { transform: scale(1); opacity: 0.7; } to { transform: scale(1.5); opacity: 1; } }
@keyframes hold { 0%, 100% { transform: scale(1.5); opacity: 1; } }
@keyframes exhale { from { transform: scale(1.5); opacity: 1; } to { transform: scale(1); opacity: 0.7; } }
.breathing-instruction { position: relative; z-index: 1; color: white; font-size: 24px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }

/* Story & Helpline */
.story-card { background: white; border-radius: 24px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 32px; }
.story-header { display: flex; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 2px solid #f0f0f0; }
.achievement { color: #813287; font-weight: 700; font-size: 18px; margin: 4px 0; }
.story-quote { background: #f8f0f9; border-left: 4px solid #813287; padding: 20px; border-radius: 12px; font-style: italic; font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
.helpline-card { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; transition: transform 0.3s; }
.helpline-card:hover { transform: translateY(-5px); }
.helpline-card.urgent { border: 3px solid #ff6b6b; background: linear-gradient(135deg, #fff5f5, #ffffff); }
.helpline-icon { font-size: 48px; display: block; margin-bottom: 16px; }
.call-btn { display: inline-block; background: linear-gradient(135deg, #813287, #ac4da4); color: white; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 18px; margin: 16px 0; transition: all 0.3s; }
`;
if (!css.includes('.mood-selector')) {
  css += '\\n' + motivationCSS;
}

// 3. INJECT JS JS JS JS
const motivationJS = `
// Motivation Logic
const moodResponses = {
  great: { title: "That's Awesome! 🎉", message: "Ride this positive wave! Tackle your toughest topic today while energy is high.", tips: ["Tackle tough topics", "Set an ambitious goal"], resources: [], urgentHelp: false },
  stressed: { title: "Take a Deep Breath 🌸", message: "Stress is normal. Break big goals into tiny tasks.", tips: ["Take a 10-minute break", "Remember: Your worth != your score"], resources: [], urgentHelp: false },
  overwhelmed: { title: "You're Carrying Too Much 💙", message: "Let's lighten the load. Stop everything. Take 5 deep breaths.", tips: ["Write down ONLY 3 things to do", "Progress > Perfection"], resources: [], urgentHelp: true },
  sad: { title: "It's Okay to Not Be Okay 🤗", message: "Bad days happen to everyone. Don't force studying today if you can't focus.", tips: ["Talk to someone", "Watch something funny"], resources: [], urgentHelp: true },
  good: { title: "Good to hear! 🙂", message: "Keep the momentum going smoothly.", tips: ["Enjoy your learning", "Stay consistent"], resources: [], urgentHelp: false },
  okay: { title: "You're doing okay 😐", message: "Neutral days are perfect for review.", tips: ["Review old notes", "Listen to calm music"], resources: [], urgentHelp: false }
};

document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const mood = this.dataset.mood;
    const response = moodResponses[mood];
    const responseDiv = document.getElementById('moodResponse');
    
    responseDiv.innerHTML = \`
      <div class="mood-card \${mood}">
        <h3>\${response.title}</h3>
        <p class="mood-message">\${response.message}</p>
        <div class="mood-tips"><h4>Quick Tips:</h4><ul>\${response.tips.map(tip => \`<li>\${tip}</li>\`).join('')}</ul></div>
        \${response.urgentHelp ? \`
          <div class="urgent-help">
            <p>⚠️ If you're experiencing persistent sadness or thoughts of self-harm:</p>
            <a href="tel:9152987821" class="emergency-btn">Call iCall (9152987821)</a>
          </div>
        \` : ''}
      </div>
    \`;
    responseDiv.style.display = 'block';
  });
});

// Pomodoro Timer
let pomodoroTime = 25 * 60;
let pomodoroInterval;
let isRunning = false;

document.getElementById('startTimer')?.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    pomodoroInterval = setInterval(() => {
      pomodoroTime--;
      const m = Math.floor(pomodoroTime / 60);
      const s = pomodoroTime % 60;
      document.getElementById('timerMinutes').textContent = m.toString().padStart(2, '0');
      document.getElementById('timerSeconds').textContent = s.toString().padStart(2, '0');
      if (pomodoroTime <= 0) {
        clearInterval(pomodoroInterval);
        isRunning = false;
        pomodoroTime = 5 * 60; // 5 min break
        alert("Time for a break! 🎉");
      }
    }, 1000);
  }
});
document.getElementById('pauseTimer')?.addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  isRunning = false;
});

// Breathing Modal Activity
document.getElementById('openBreathingModal')?.addEventListener('click', () => {
  document.getElementById('breathingModal').classList.remove('hidden');
});
document.getElementById('closeBreathing')?.addEventListener('click', () => {
  document.getElementById('breathingModal').classList.add('hidden');
});

// Breathing Animation Sequence
document.getElementById('startBreathing')?.addEventListener('click', () => {
  let currentStep = 0;
  let cycleCount = 0;
  const maxCycles = 4;
  const steps = [
    { duration: 4000, text: "Breathe In... 4", phase: "inhale" },
    { duration: 7000, text: "Hold... 7", phase: "hold" },
    { duration: 8000, text: "Breathe Out... 8", phase: "exhale" }
  ];
  
  function runBreathingCycle() {
    if (cycleCount >= maxCycles) {
      document.getElementById('breathingInstruction').textContent = "Great job! You're calmer now 🌟";
      return;
    }
    const step = steps[currentStep];
    const instruction = document.getElementById('breathingInstruction');
    const circle = document.querySelector('.circle-animation');
    instruction.textContent = step.text;
    circle.className = 'circle-animation ' + step.phase;
    
    setTimeout(() => {
      currentStep++;
      if (currentStep >= steps.length) { currentStep = 0; cycleCount++; }
      runBreathingCycle();
    }, step.duration);
  }
  runBreathingCycle();
});

// Enhanced AI Chatbot Override
const origCallClaudeAPI = window.callClaudeAPI;
const counselingTriggerPhrases = ["depressed", "give up", "hopeless", "pressure", "anxiety", "panic", "stressed", "sad"];

window.callClaudeAPI = async function(userMessage) {
  const needsCounseling = counselingTriggerPhrases.some(phrase => userMessage.toLowerCase().includes(phrase));
  
  if (needsCounseling) {
    const header = document.querySelector('.chat-header');
    if(header) header.style.background = 'linear-gradient(135deg, #4a90e2, #7b68ee)';
    const status = document.querySelector('.status-text');
    if(status) status.textContent = 'Counseling Mode • Here to listen';
    // Let's proxy to the original API, but with a warning prefix if we were actually changing the system prompt inside callClaudeAPI.
    // For local dummy mode or real API mode, this is just an override demo.
  }
  
  return await origCallClaudeAPI(userMessage);
};

// Motivation Popup After 30 seconds
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!localStorage.getItem('motivationShown')) {
      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.bottom = '20px';
      popup.style.left = '20px';
      popup.style.background = 'var(--white)';
      popup.style.padding = '20px';
      popup.style.borderRadius = '15px';
      popup.style.boxShadow = '0 5px 25px rgba(0,0,0,0.2)';
      popup.style.zIndex = '9999';
      popup.innerHTML = \`
        <div class="popup-content">
          <h3 style="color:var(--primary-purple);margin-bottom:10px;">Taking a moment to breathe? 🌸</h3>
          <p style="margin-bottom:15px;">Remember: You're doing better than you think!</p>
          <button id="close-mot-popup" style="background:var(--light-gray);border:none;padding:8px 15px;border-radius:20px;cursor:pointer;margin-right:10px;">Thanks, needed this 💙</button>
          <a href="#motivation" style="color:var(--primary-purple);text-decoration:none;font-weight:bold;">Show me more →</a>
        </div>
      \`;
      document.body.appendChild(popup);
      
      document.getElementById('close-mot-popup').addEventListener('click', () => {
        popup.remove();
      });
      localStorage.setItem('motivationShown', 'true');
    }
  }, 30000);
});
`;
if (!js.includes('moodResponses')) {
  js += '\\n' + motivationJS;
}

// Add the navbar link dynamically
if (!html.includes('id="motivation"')) {
  html = html.replace(
    '<a href="#home">Home</a>',
    '<a href="#home">Home</a>\n<a href="#motivation" style="color:var(--warning-orange);">Mental Wellness 💪</a>'
  );
}

fs.writeFileSync(indexHtml, html);
fs.writeFileSync(styleCss, css);
fs.writeFileSync(scriptJs, js);
console.log("Successfully injected motivation hub!");
