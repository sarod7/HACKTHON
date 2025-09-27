// Navigation Functions
function showScreen(id) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Show selected screen
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  
  // Update navigation active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (id === 'dashboard') document.getElementById('nav-dashboard').classList.add('active');
  if (id === 'learning') document.getElementById('nav-learning').classList.add('active');
  if (id === 'quiz') document.getElementById('nav-quiz').classList.add('active');
  if (id === 'news') document.getElementById('nav-news').classList.add('active');
  if (id === 'aibot') document.getElementById('nav-aibot').classList.add('active');
}

// Quiz Logic
let selectedOption = null;

function selectOption(node) {
  // Remove previous selection
  document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  
  // Add selection to clicked option
  node.classList.add('selected');
  selectedOption = node.innerText;
}

function submitQuiz() {
  const feedback = document.getElementById('quiz-feedback');
  
  if (!selectedOption) {
    feedback.innerText = 'Please choose an option.';
    return;
  }
  
  const correct = "3–6 months of expenses";
  
  if (selectedOption.trim() === correct) {
    feedback.innerText = 'Correct ✅ — You earned 20 points!';
  } else {
    feedback.innerText = 'Not quite — recommended answer: 3–6 months of expenses.';
  }
  
  // Reset after showing feedback
  setTimeout(() => {
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    selectedOption = null;
  }, 1400);
}

// AI Bot Chat Logic
function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const message = chatInput.value.trim();
  
  if (message === '') return;
  
  // Add user message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-message user';
  userDiv.innerHTML = `<strong>You:</strong> ${message}`;
  chatLog.appendChild(userDiv);
  
  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
  
  // Simulate AI response
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-message bot';
    
    // Simple demo responses based on keywords
    let response = "That's a great question! ";
    
    if (message.toLowerCase().includes('save') || message.toLowerCase().includes('saving')) {
      response += "Start by setting aside 10-15% of your income. Create a separate savings account and automate transfers!";
    } else if (message.toLowerCase().includes('invest') || message.toLowerCase().includes('investment')) {
      response += "Begin with SIPs in mutual funds. Diversify your portfolio and think long-term. Always research before investing!";
    } else if (message.toLowerCase().includes('budget')) {
      response += "Follow the 50-30-20 rule: 50% needs, 30% wants, 20% savings. Track your expenses using apps or spreadsheets!";
    } else if (message.toLowerCase().includes('scam') || message.toLowerCase().includes('fraud')) {
      response += "Never share OTPs, passwords, or bank details. Be wary of guaranteed returns or pressure to act quickly!";
    } else if (message.toLowerCase().includes('tax')) {
      response += "Take advantage of tax-saving investments like ELSS, PPF, and EPF. Keep all your receipts organized!";
    } else if (message.toLowerCase().includes('credit') || message.toLowerCase().includes('loan')) {
      response += "Build good credit history by paying bills on time. Only borrow what you can afford to repay!";
    } else if (message.toLowerCase().includes('emergency')) {
      response += "Build an emergency fund covering 3-6 months of expenses. Keep it in a separate, easily accessible account!";
    } else {
      response += "I'm here to help with financial advice. You can ask me about saving, investing, budgeting, or avoiding scams!";
    }
    
    botDiv.innerHTML = `<strong>🤖 FinanceBot:</strong> ${response}`;
    chatLog.appendChild(botDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 800);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize welcome screen
  showScreen('welcome');
  
  // Chat input Enter key support
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Scam Report Function (placeholder)
function reportScam() {
  alert('Report feature placeholder — in full app this would open a form.');
}

// Additional utility functions for future features
function updateProgress(newPoints) {
  // Function to update user progress
  const progressText = document.querySelector('.tracker .small');
  if (progressText) {
    const currentPoints = 420; // This would come from user data
    const newTotal = currentPoints + newPoints;
    progressText.textContent = `Points: ${newTotal} • Streak: 5 days`;
  }
}

function addNewMessage(sender, message) {
  // Function to add messages to chat programmatically
  const chatLog = document.getElementById('chat-log');
  if (chatLog) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : '🤖 FinanceBot'}:</strong> ${message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showScreen,
    selectOption,
    submitQuiz,
    sendMessage,
    updateProgress,
    addNewMessage
  };
}