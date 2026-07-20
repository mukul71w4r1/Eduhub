const platforms = [
  {
    name: "Physics Wallah",
    logo: "pw-logo.png",
    url: "https://www.pw.live/",
    description: "Affordable quality education for JEE, NEET, and school boards",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "affordable",
    price: "₹3,000-6,000/year",
    features: ["Live Classes", "Recorded Lectures", "Test Series", "Doubt Solving"],
    rating: 4.5
  },
  {
    name: "Unacademy",
    logo: "unacademy-logo.png",
    url: "https://unacademy.com/",
    description: "India's largest learning platform with top educators",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce", "arts"],
    budget: "medium",
    price: "₹5,000-15,000/year",
    features: ["Live Classes", "Doubt Solving", "Mock Tests"],
    rating: 4.3
  },
  {
    name: "Vedantu",
    logo: "vedantu-logo.png",
    url: "https://www.vedantu.com/",
    description: "Live online classes with personalized attention",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "medium",
    price: "₹8,000-20,000/year",
    features: ["Live Classes", "1-on-1 Tutoring", "Doubt Clearing"],
    rating: 4.4
  },
  {
    name: "Allen Online",
    logo: "allen-logo.png",
    url: "https://www.allen.ac.in/online-programs",
    description: "Trusted name for JEE & NEET preparation",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "premium",
    price: "₹40,000-80,000/year",
    features: ["Live Classes", "Study Material", "Test Series", "Mentorship"],
    rating: 4.6
  },
  {
    name: "Byju's",
    logo: "byjus-logo.png",
    url: "https://byjus.com/",
    description: "Comprehensive learning app with animated videos",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "premium",
    price: "₹25,000-50,000/year",
    features: ["Video Lessons", "Practice Tests", "Personalized Learning"],
    rating: 4.2
  },
  {
    name: "Khan Academy",
    logo: "khan-logo.png",
    url: "https://www.khanacademy.org/",
    description: "Free world-class education for anyone, anywhere",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "commerce"],
    budget: "free",
    price: "Free",
    features: ["Video Lessons", "Practice Exercises", "Progress Tracking"],
    rating: 4.7
  },
  {
    name: "Toppr",
    logo: "toppr-logo.png",
    url: "https://www.toppr.com/",
    description: "Personalized learning platform with adaptive tests",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "affordable",
    price: "₹4,000-10,000/year",
    features: ["Adaptive Practice", "Live Doubt Solving", "Video Lectures"],
    rating: 4.1
  },
  {
    name: "Doubtnut",
    logo: "doubtnut-logo.png",
    url: "https://doubtnut.com/",
    description: "Get instant solutions by taking a photo of your doubts",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB"],
    budget: "free",
    price: "Free (Premium: ₹2,000/yr)",
    features: ["Photo-based Doubt Solving", "Video Solutions", "Live Classes"],
    rating: 4.3
  },
  {
    name: "Embibe",
    logo: "embibe-logo.png",
    url: "https://www.embibe.com/",
    description: "AI-powered personalized learning and test prep",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "free",
    price: "Free",
    features: ["AI Analysis", "Mock Tests", "Performance Insights"],
    rating: 4.2
  },
  {
    name: "Extramarks",
    logo: "extramarks-logo.png",
    url: "https://www.extramarks.com/",
    description: "K-12 learning with interactive content",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "medium",
    price: "₹10,000-15,000/year",
    features: ["Video Lectures", "Practice Tests", "Learning App"],
    rating: 4.0
  }
];

let selectedForCompare = [];

function getInitials(name) {
  if (name.includes(' ')) {
    const parts = name.split(' ');
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getRandomColor(name) {
  const colors = ['#fcedec', '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0'];
  const textColors = ['#e53935', '#1e88e5', '#8e24aa', '#43a047', '#fb8c00'];
  let val = 0;
  for (let i = 0; i < name.length; i++) val += name.charCodeAt(i);
  const index = val % colors.length;
  return { bg: colors[index], text: textColors[index] };
}

function getBudgetBadge(budget) {
  if (budget === 'free') return '<span class="badge badge-success">Free</span>';
  if (budget === 'affordable') return '<span class="badge badge-warning">Affordable</span>';
  if (budget === 'medium') return '<span class="badge badge-warning">Medium Budget</span>';
  if (budget === 'premium') return '<span class="badge badge-premium">Premium</span>';
  return '';
}

function displayPlatforms(list) {
  const grid = document.getElementById('platforms-grid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #888; padding: 40px;">No platforms match your criteria. Try adjusting your filters.</p>';
    return;
  }

  list.forEach((p, index) => {
    const checked = selectedForCompare.includes(p.name) ? 'checked' : '';
    const colorStyle = getRandomColor(p.name);

    const tagsHtml = p.features.slice(0, 2).map(f => `<span>${f}</span>`).join('');

    const card = document.createElement('div');
    card.className = 'platform-card';
    card.style.animationDelay = `${(index % 5) * 0.1}s`;

    card.innerHTML = `
            <div class="card-header">
                <div class="platform-logo" style="background-color: ${colorStyle.bg};">
                    <span style="color: ${colorStyle.text}; font-weight: bold; font-size: 22px;">${getInitials(p.name)}</span>
                </div>
                ${getBudgetBadge(p.budget)}
            </div>
            <h3>${p.name}</h3>
            <div class="rating">
                <i class="fas fa-star"></i> <span>${p.rating} / 5</span>
            </div>
            <p>${p.description}</p>
            <div class="tags">
                ${tagsHtml}
                ${p.features.length > 2 ? `<span>+${p.features.length - 2}</span>` : ''}
            </div>
            <div class="compare-checkbox-container">
                <input type="checkbox" id="compare-${index}" value="${p.name.replace(/"/g, '&quot;')}" ${checked} onchange="toggleCompare(this.value)">
                <label for="compare-${index}">Compare</label>
            </div>
        `;
    grid.appendChild(card);
  });
}

function filterPlatforms() {
  const grade = document.getElementById('grade-filter').value;
  const budget = document.getElementById('budget-filter').value;
  const style = document.getElementById('learning-style').value;
  const query = document.getElementById('search-bar').value.toLowerCase();

  const filtered = platforms.filter(p => {
    const matchGrade = grade === 'All Grades' || p.grades.includes(grade);
    const matchBudget = budget === 'All Budgets' || p.budget === budget;
    const matchStyle = style === 'All Learning Styles' || p.features.includes(style);
    const matchSearch = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);

    return matchGrade && matchBudget && matchStyle && matchSearch;
  });

  displayPlatforms(filtered);
}

function initFilters() {
  document.getElementById('grade-filter').addEventListener('change', filterPlatforms);
  document.getElementById('budget-filter').addEventListener('change', filterPlatforms);
  document.getElementById('learning-style').addEventListener('change', filterPlatforms);
  document.getElementById('search-bar').addEventListener('input', filterPlatforms);

  // Wire up hero search to the same logic
  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const heroQuery = document.getElementById('hero-search').value;
      document.getElementById('search-bar').value = heroQuery;
      filterPlatforms();
      document.getElementById('platforms-grid').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Category Buttons
  const catBtns = document.querySelectorAll('.category-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = e.target.textContent;
      let val = 'All Grades';
      if (text.includes('9-10')) val = '9-10';
      else if (text.includes('11-12')) val = '11-12';
      else if (text.includes('Competitive')) val = 'competitive';

      document.getElementById('grade-filter').value = val;
      filterPlatforms();
      document.getElementById('platforms-grid').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

window.toggleCompare = function (name) {
  if (selectedForCompare.includes(name)) {
    selectedForCompare = selectedForCompare.filter(n => n !== name);
  } else {
    if (selectedForCompare.length >= 3) {
      alert("You can compare up to 3 platforms at once.");
      filterPlatforms(); // Re-render to uncheck the box visually
      return;
    }
    selectedForCompare.push(name);
  }
  updateCompareButton();
}

function updateCompareButton() {
  const btn = document.getElementById('floating-compare-btn');
  const countSpan = document.getElementById('compare-count');

  countSpan.textContent = selectedForCompare.length;

  if (selectedForCompare.length >= 2) {
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
}

function openCompareModal() {
  const modal = document.getElementById('compare-modal');
  const wrapper = document.getElementById('comparison-table-wrapper');

  const selectedPlatforms = platforms.filter(p => selectedForCompare.includes(p.name));

  let html = '<table class="comparison-table">';
  html += '<tr><th>Feature</th>' + selectedPlatforms.map(p => `<th><div style="color:var(--primary-purple); font-size:22px; margin-bottom:5px;">${p.name}</div>${getBudgetBadge(p.budget)}</th>`).join('') + '</tr>';
  html += '<tr><td>Rating</td>' + selectedPlatforms.map(p => `<td><b>⭐ ${p.rating}</b> / 5</td>`).join('') + '</tr>';
  html += '<tr><td>Price</td>' + selectedPlatforms.map(p => `<td><b>${p.price}</b></td>`).join('') + '</tr>';
  html += '<tr><td>Target Grades</td>' + selectedPlatforms.map(p => `<td>${p.grades.join(', ')}</td>`).join('') + '</tr>';
  html += '<tr><td>Key Streams</td>' + selectedPlatforms.map(p => `<td>${p.streams.join(', ').toUpperCase()}</td>`).join('') + '</tr>';
  html += '<tr><td>Top Features</td>' + selectedPlatforms.map(p => `<td><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></td>`).join('') + '</tr>';
  html += '<tr><td>Action</td>' + selectedPlatforms.map(p => `<td><a href="${p.url}" target="_blank" style="display:inline-block; padding:8px 16px; background:var(--primary-purple); color:white; text-decoration:none; border-radius:20px; font-weight:600;">Visit Site</a></td>`).join('') + '</tr>';
  html += '</table>';

  wrapper.innerHTML = html;
  modal.classList.remove('hidden');
}

function closeCompareModal() {
  document.getElementById('compare-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Event listeners
  document.getElementById('floating-compare-btn').addEventListener('click', openCompareModal);
  document.getElementById('close-modal').addEventListener('click', closeCompareModal);

  // Close modal on outside click
  document.getElementById('compare-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('compare-modal')) {
      closeCompareModal();
    }
  });

  // Mobile menu placeholder
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      alert('Mobile menu toggled! (To be implemented)');
    });
  }

  // Theme toggling
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check local storage for theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // Initialize state
  displayPlatforms(platforms);
  initFilters();
});

/* ============================================
   AI CHAT FUNCTIONALITY
   ============================================ */

// Chat State
let conversationHistory = [];
let userContext = {
  grade: null,
  stream: null,
  budget: null,
  interests: [],
  goals: []
};

// DOM Elements
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeBtn = document.getElementById('closeChat');
const minimizeBtn = document.getElementById('minimizeChat');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');

// Toggle Chat
if (chatButton) {
  chatButton.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatButton.style.display = 'none';
    chatInput.focus();
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatButton.style.display = 'flex';
  });
}

if (minimizeBtn) {
  minimizeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatButton.style.display = 'flex';
  });
}

// Quick Action Buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const query = btn.getAttribute('data-query');
    sendMessage(query);
  });
});

// Send Message
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      sendMessage(message);
    }
  });
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        sendMessage(message);
      }
    }
  });

  // Auto-resize chat input
  chatInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Remove quick actions after first interaction
  chatInput.addEventListener('focus', () => {
    const quickActions = document.querySelector('.quick-actions');
    if (quickActions) {
      setTimeout(() => {
        quickActions.style.opacity = '0';
        quickActions.style.transform = 'translateY(-10px)';
        setTimeout(() => quickActions.remove(), 300);
      }, 5000);
    }
  }, { once: true });
}

// Main Send Function
async function sendMessage(message) {
  // Add user message to UI
  addMessage(message, 'user');
  chatInput.value = '';

  // Show typing indicator
  typingIndicator.style.display = 'flex';

  // Add to conversation history
  conversationHistory.push({
    role: 'user',
    content: message
  });

  try {
    // Call Claude API
    const response = await callClaudeAPI(message);

    // Hide typing indicator
    typingIndicator.style.display = 'none';

    // Add bot response
    addMessage(response, 'bot');

    // Add to history
    conversationHistory.push({
      role: 'assistant',
      content: response
    });

    trackUserJourney();
  } catch (error) {
    typingIndicator.style.display = 'none';
    addMessage("Oops! I'm having trouble connecting to the network right now. Please try again! 😅", 'bot');
    console.error('Error:', error);
  }
}

// Call Claude API
async function callClaudeAPI(userMessage) {
  const systemPrompt = `You are EduBot, a friendly and knowledgeable AI learning assistant for an Indian e-learning platform discovery website. Your personality:

- **Warm & Encouraging**: Use emojis, be conversational, supportive, never judgmental
- **Expert Guide**: Know about Indian education system (CBSE, ICSE, boards, JEE, NEET, etc.)
- **Practical**: Give actionable advice based on student's grade, interests, budget
- **Honest**: Don't oversell platforms, give balanced recommendations

**Your Knowledge Base:**
${JSON.stringify(platforms, null, 2)}

**Your Tasks:**
1. Understand student's: grade level, stream (PCM/PCB/Commerce/Arts), career goals, budget
2. Recommend 1-3 best-fit platforms from the list above
3. Explain WHY each platform suits them
4. Provide study tips, career guidance, motivation
5. Answer questions about courses, exams, career paths

**Response Format:**
- Keep responses concise (2-4 short paragraphs)
- Use emojis naturally (not excessively)
- When recommending platforms, format as:
  **[Platform Name]** - [1-line reason why it fits]
  • Price: [price]
  • Best for: [specific use case]
  [Link to visit]
  
**Conversation Context:**
${userContext.grade ? "Student is in: " + userContext.grade : ""}
${userContext.stream ? "Stream: " + userContext.stream : ""}
${userContext.budget ? "Budget: " + userContext.budget : ""}

Be helpful, be human, be awesome! 🚀`;

  // Extract user context from conversation
  extractUserContext(userMessage);

  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate AI processing time

  // Build a highly efficient recommendation based on context
  let matches = platforms.filter(p => true);
  let rationale = "Based on your overall profile, here are the top suggestions:\\n\\n";
  
  // Filter by grade
  if (userContext.grade) {
    matches = matches.filter(p => {
      if (userContext.grade.includes('9') || userContext.grade.includes('10')) return p.grades.includes('9-10');
      if (userContext.grade.includes('11') || userContext.grade.includes('12')) return p.grades.includes('11-12');
      return true;
    });
  }

  // Filter by stream
  if (userContext.stream) {
    matches = matches.filter(p => p.streams.map(s=>s.toLowerCase()).includes(userContext.stream.toLowerCase()));
  }

  // Filter by budget
  if (userContext.budget) {
    if (userContext.budget === 'free') {
      matches = matches.filter(p => p.budget === 'free');
      rationale = "I see you're looking for high-quality **free** resources. Here is the best option for you:\\n\\n";
    } else if (userContext.budget === 'affordable') {
      matches = matches.filter(p => p.budget === 'free' || p.budget === 'affordable');
      rationale = "I've prioritized **affordable & value-for-money** platforms that don't compromise on quality:\\n\\n";
    }
  }

  // Sort by rating to ensure the highest quality surface first
  matches.sort((a, b) => b.rating - a.rating);

  let botReply = '';

  if (matches.length === 0) {
    botReply = "Hmm, I couldn't find a perfect match for that specific combination. Could you tell me a bit more about what you're looking for? (e.g., specific subjects or exams) 🤔";
  } else {
    // Take top 2 recommendations for conciseness
    const topMatches = matches.slice(0, 2);
    botReply += rationale;
    
    topMatches.forEach(p => {
      botReply += `**${p.name}** - ⭐ ${p.rating}/5\\n`;
      botReply += `• Best for: ${p.description}\\n`;
      botReply += `• Price: ${p.price}\\n`;
      botReply += `👉 ${p.url}\\n\\n`;
    });
    
    botReply += "Let me know if you need specific study tips or a different budget range! 🚀";
  }

  return botReply;
}

// Extract Context from User Messages
function extractUserContext(message) {
  const lower = message.toLowerCase();

  // Detect grade
  if (lower.includes('class 9') || lower.includes('9th')) userContext.grade = 'Class 9';
  if (lower.includes('class 10') || lower.includes('10th')) userContext.grade = 'Class 10';
  if (lower.includes('class 11') || lower.includes('11th')) userContext.grade = 'Class 11';
  if (lower.includes('class 12') || lower.includes('12th')) userContext.grade = 'Class 12';

  // Detect stream
  if (lower.includes('pcm') || lower.includes('physics chemistry math')) userContext.stream = 'PCM';
  if (lower.includes('pcb') || lower.includes('biology')) userContext.stream = 'PCB';
  if (lower.includes('commerce')) userContext.stream = 'Commerce';
  if (lower.includes('arts') || lower.includes('humanities')) userContext.stream = 'Arts';

  // Detect budget
  if (lower.includes('free') || lower.includes('no money')) userContext.budget = 'free';
  if (lower.includes('cheap') || lower.includes('affordable') || lower.includes('budget')) userContext.budget = 'affordable';

  // Detect goals
  if (lower.includes('jee')) userContext.goals.push('JEE');
  if (lower.includes('neet')) userContext.goals.push('NEET');
  if (lower.includes('boards') || lower.includes('school exam')) userContext.goals.push('Boards');
}

// Add Message to UI
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  if (sender === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <img src="https://ui-avatars.com/api/?name=Edu+Bot&background=ffffff&color=813287&rounded=true" alt="Bot">
      </div>
      <div class="message-content">
        <div class="message-bubble">
          ${formatBotMessage(text)}
        </div>
        <span class="message-time">${timeStr}</span>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
        <span class="message-time">${timeStr}</span>
      </div>
    `;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format Bot Messages (convert markdown-style to HTML)
function formatBotMessage(text) {
  // Convert **bold** to <strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert bullet points to list items
  const lines = text.split('\n');
  let formatted = '';
  let inList = false;

  lines.forEach(line => {
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      if (!inList) {
        formatted += '<ul>';
        inList = true;
      }
      formatted += `<li>${line.trim().substring(1).trim()}</li>`;
    } else {
      if (inList) {
        formatted += '</ul>';
        inList = false;
      }
      if (line.trim()) {
        formatted += `<p>${line}</p>`;
      }
    }
  });

  if (inList) formatted += '</ul>';

  // Convert URLs to clickable links
  formatted = formatted.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="recommendation-link">Visit Platform →</a>'
  );

  return formatted;
}

// Smart Context Tracking
function trackUserJourney() {
  const journey = {
    sessionStart: new Date(),
    messagesCount: conversationHistory.length,
    platformsViewed: [],
    recommendationsGiven: [],
    userProfile: userContext
  };
  localStorage.setItem('edubot_journey', JSON.stringify(journey));
}


// 1. Hero Animated Counters
function animateCounters() {
  const elements = document.querySelectorAll('.stat-number');
  elements.forEach(element => {
    const target = parseInt(element.getAttribute('data-count'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 30);
  });
}
window.addEventListener('load', () => { setTimeout(animateCounters, 500); });

// 2. Chart logic for Analytics & Compare
function initCharts() {
  const ctx = document.getElementById('priceChart');
  if (ctx && window.Chart) {
    new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['PCM', 'PCB', 'Commerce', 'Arts'],
        datasets: [{
          label: 'Average Cost (₹/year)',
          data: [12000, 15000, 8000, 6000],
          backgroundColor: ['#57a7a3', '#ac4da4', '#f05b83', '#b9bebc']
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}
window.addEventListener('load', initCharts);

// Modify openCompareModal to inject Chart
const origOpenCompare = openCompareModal;
window.openCompareModal = function () {
  origOpenCompare();
  // We re-render the chart!
  const modalObj = document.getElementById('compare-modal');
  if (!modalObj.classList.contains('hidden')) {
    setTimeout(renderCompareChart, 200);
  }
};
let compChartInstance = null;
function renderCompareChart() {
  const selectedPlatforms = platforms.filter(p => selectedForCompare.includes(p.name));
  if (selectedPlatforms.length < 2) return;
  const ctx = document.getElementById('comparisonChart');
  if (!ctx || !window.Chart) return;

  if (compChartInstance) compChartInstance.destroy();

  const colors = ['87,167,163', '172,77,164', '240,91,131'];
  compChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['Price Value', 'Quality', 'Rating', 'Support', 'Features'],
      datasets: selectedPlatforms.map((p, i) => {
        let priceScore = p.budget === 'free' ? 10 : (p.budget === 'affordable' ? 8 : (p.budget === 'medium' ? 6 : 4));
        return {
          label: p.name,
          data: [priceScore, p.rating * 2, p.rating * 2, p.features.length * 2, p.features.length * 2],
          backgroundColor: `rgba(${colors[i]}, 0.2)`,
          borderColor: `rgba(${colors[i]}, 1)`,
          borderWidth: 2
        }
      })
    },
    options: { scales: { r: { beginAtZero: true, max: 10 } } }
  });

  // Update winner
  const winnerNode = document.getElementById('winner-recommendation');
  const winnerText = document.getElementById('winner-text');
  if (winnerNode && winnerText) {
    const best = selectedPlatforms.reduce((a, b) => a.rating > b.rating ? a : b);
    winnerText.innerHTML = `<strong>${best.name}</strong> - Highest rated among your selections with ${best.rating}/5!`;
    winnerNode.style.display = 'block';
  }
}

// 3. Notification system
setTimeout(() => {
  const alertBox = document.getElementById('priceAlert');
  if (alertBox) {
    alertBox.style.display = 'flex';
    alertBox.querySelector('.close-alert').addEventListener('click', () => alertBox.style.display = 'none');
    setTimeout(() => { alertBox.style.display = 'none'; }, 10000); // Auto hide
  }
}, 3000);
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
  btn.addEventListener('click', function () {
    const mood = this.dataset.mood;
    const response = moodResponses[mood];
    const responseDiv = document.getElementById('moodResponse');

    responseDiv.innerHTML = `
      <div class="mood-card ${mood}">
        <h3>${response.title}</h3>
        <p class="mood-message">${response.message}</p>
        <div class="mood-tips"><h4>Quick Tips:</h4><ul>${response.tips.map(tip => `<li>${tip}</li>`).join('')}</ul></div>
        ${response.urgentHelp ? `
          <div class="urgent-help">
            <p>⚠️ If you're experiencing persistent sadness or thoughts of self-harm:</p>
            <a href="tel:9152987821" class="emergency-btn">Call iCall (9152987821)</a>
          </div>
        ` : ''}
      </div>
    `;
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

window.callClaudeAPI = async function (userMessage) {
  const needsCounseling = counselingTriggerPhrases.some(phrase => userMessage.toLowerCase().includes(phrase));

  if (needsCounseling) {
    const header = document.querySelector('.chat-header');
    if (header) header.style.background = 'linear-gradient(135deg, #4a90e2, #7b68ee)';
    const status = document.querySelector('.status-text');
    if (status) status.textContent = 'Counseling Mode • Here to listen';
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
      popup.innerHTML = `
        <div class="popup-content">
          <h3 style="color:var(--primary-purple);margin-bottom:10px;">Taking a moment to breathe? 🌸</h3>
          <p style="margin-bottom:15px;">Remember: You're doing better than you think!</p>
          <button id="close-mot-popup" style="background:var(--light-gray);border:none;padding:8px 15px;border-radius:20px;cursor:pointer;margin-right:10px;">Thanks, needed this 💙</button>
          <a href="#motivation" style="color:var(--primary-purple);text-decoration:none;font-weight:bold;">Show me more →</a>
        </div>
      `;
      document.body.appendChild(popup);

      document.getElementById('close-mot-popup').addEventListener('click', () => {
        popup.remove();
      });
      localStorage.setItem('motivationShown', 'true');
    }
  }, 30000);
});


// Live Comments Logic
const defaultComments = [
  { name: "Rahul Sharma", text: "Has anyone tried the new Physics Wallah JEE batch? Is the doubt solving actually fast?", time: "2 hours ago", avatar: "11", badge: "Verified" },
  { name: "Sneha Patel", text: "Yes! The live classes are great, but for doubt solving I personally prefer using the recorded sessions and solving modules myself.", time: "1 hour ago", avatar: "5", badge: "" },
  { name: "EduHub Admin", text: "Welcome to the new live discussion board! Feel free to ask questions about platform choices.", time: "10 mins ago", avatar: "1", badge: "Admin" }
];

function loadComments() {
  const list = document.getElementById('commentsList');
  if(!list) return;
  
  const saved = JSON.parse(localStorage.getItem('edu_comments') || JSON.stringify(defaultComments));
  list.innerHTML = '';
  
  saved.forEach(c => {
    const timeStr = c.time || 'Just now';
    const badgeHTML = c.badge ? `<span class="author-badge">${c.badge}</span>` : '';
    const avatarNum = c.avatar || '12';
    
    list.innerHTML += `
      <div class="comment-card">
        <img src="https://i.pravatar.cc/150?img=${avatarNum}" alt="User" class="comment-avatar">
        <div style="flex:1;">
          <div class="comment-header">
            <h4 class="comment-author">${c.name} ${badgeHTML}</h4>
            <span class="comment-time">${timeStr}</span>
          </div>
          <p class="comment-text">${c.text}</p>
        </div>
      </div>
    `;
  });
  
  list.scrollTop = list.scrollHeight;
}

window.addEventListener('load', () => {
  loadComments();
  
  const postBtn = document.getElementById('postCommentBtn');
  if(postBtn) {
    postBtn.addEventListener('click', () => {
      const name = document.getElementById('commenterName').value.trim();
      const text = document.getElementById('commenterMessage').value.trim();
      
      if(name && text) {
        let saved = JSON.parse(localStorage.getItem('edu_comments') || JSON.stringify(defaultComments));
        saved.push({
          name: name,
          text: text,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          avatar: "12",
          badge: "New"
        });
        localStorage.setItem('edu_comments', JSON.stringify(saved));
        
        document.getElementById('commenterMessage').value = '';
        loadComments();
      }
    });
  }
});
