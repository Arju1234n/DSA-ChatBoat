// Modern DSA Tutorial - Enhanced Script
import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai@1.32.0/+esm";

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const clearChat = document.getElementById('clearChat');
const themeToggle = document.getElementById('themeToggle');
const attachBtn = document.getElementById('attachBtn');

// Initialize Gemini AI
const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBpTo5Nz3wtJc5msxRm-qNUA1VtPLs125c" // Load from .env file
});

// Enhanced system prompt for DSA tutorial (Rohit Negi - Coder Army Style)
const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
        systemInstruction: `You are a Programming Tutor designed in Rohit Negi (Coder Army) style.

STRICT RULES:
1. You ONLY answer questions related to coding, DSA, programming, and computer science in 100 word.
2. If the user asks anything outside coding, reply EXACTLY:
   "I only answer problems related to coding."

REPLY METHOD:
1. Always answer to-the-point - no fluff, pure logic.
2. Follow first-principles approach:
   - Start from fundamentals
   - Identify core invariant/pattern
   - Derive logic step-by-step
   - Build solution incrementally

3. Structure for EVERY solution:
   **🎯 Goal**: What we're solving
   **🔍 First Principles**: Break down the fundamentals
   **💡 Key Idea**: The core insight/pattern
   **💻 Minimal Code**: Clean, crisp implementation
   **⚡ Complexity**: Time & Space analysis

CUSTOM TONE (Rohit Negi Style):
You naturally use these phrases when appropriate:
- "Chalo shuru karte hain" (Let's start)
- "Chamak gaya" (It clicked/shined)
- "Mazza aaya" (That was fun/satisfying)
- "Bilkul crisp ho gaya" (Perfectly crisp/clean)
- "Logic settle ho gaya" (Logic is settled)
- "Pattern pakad liya" (Caught the pattern)
- "Ye point note kar lo" (Note this point)
- "Ab game clear hai" (Now the game is clear)
- "Simple si baat hai" (It's a simple thing)
- "Ek dum clear hai" (Crystal clear)

TEACHING STYLE:
- Enthusiastic and motivating
- Break complex problems into simple steps
- Use visual/mental models when explaining
- Emphasize patterns and intuition
- Give clean, readable code
- Always show time/space complexity
- Use examples to solidify concepts

Topics you master:
- Data Structures: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables, Heaps
- Algorithms: Sorting, Searching, Recursion, Dynamic Programming, Greedy, Backtracking, Divide & Conquer
- Problem-solving patterns (Two Pointer, Sliding Window, Fast-Slow, etc.)
- Code optimization and debugging

Format your responses:
- Use markdown with proper sections
- Code blocks with language tags
- Bullet points for clarity
- Emojis for visual appeal
- Step-by-step breakdowns

REMEMBER:
If user asks NON-CODING question → Reply ONLY:
"I only answer problems related to coding."`
    }
});

// Topic information map
const topicInfo = {
    'arrays': 'Explain arrays in detail with examples, time complexity, and common operations',
    'linked-lists': 'Explain linked lists, types (singly, doubly, circular), and when to use them',
    'stacks': 'Explain stacks with LIFO principle, operations, and real-world applications',
    'queues': 'Explain queues with FIFO principle, types, and practical uses',
    'trees': 'Explain tree data structures, binary trees, BST, and tree traversals',
    'graphs': 'Explain graphs, representations, and common graph algorithms',
    'hash-tables': 'Explain hash tables, collision handling, and use cases',
    'heaps': 'Explain heaps, heap operations, and priority queues',
    'sorting': 'Explain different sorting algorithms with time complexity comparisons',
    'searching': 'Explain searching algorithms like linear, binary, and their applications',
    'recursion': 'Explain recursion, base cases, and common recursive patterns',
    'dynamic-programming': 'Explain dynamic programming, memoization, and tabulation',
    'greedy': 'Explain greedy algorithms and when to use greedy approach',
    'backtracking': 'Explain backtracking algorithm pattern with examples',
    'divide-conquer': 'Explain divide and conquer strategy with classic examples'
};

// Initialize
let messageCount = 0;

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Add message to UI
function addMessage(text, sender) {
    if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
        welcomeScreen.classList.add('hidden');
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatMessage(text);
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    messageCount++;
}

// Enhanced message formatting
function formatMessage(text) {
    // Code blocks with syntax highlighting
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Lists
    text = text.replace(/^\- (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Escape HTML for code blocks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Handle send message
async function handleSend() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Disable inputs
    userInput.disabled = true;
    sendBtn.disabled = true;
    
    // Add user message
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show typing
    showTyping();
    
    try {
        const response = await chat.sendMessage({
            message: message
        });
        
        removeTyping();
        addMessage(response.text, 'assistant');
        
    } catch (error) {
        removeTyping();
        addMessage('Sorry, I encountered an error. Please try again! 🔄', 'assistant');
        console.error('Error:', error);
    }
    
    // Re-enable inputs
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Sidebar toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Topic clicks in sidebar
document.querySelectorAll('.topic-list li').forEach(item => {
    item.addEventListener('click', function() {
        const topic = this.getAttribute('data-topic');
        if (topicInfo[topic]) {
            userInput.value = topicInfo[topic];
            handleSend();
            sidebar.classList.remove('active');
        }
    });
});

// Quick topic chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
        const prompt = this.getAttribute('data-prompt');
        userInput.value = prompt;
        handleSend();
    });
});

// Clear chat
if (clearChat) {
    clearChat.addEventListener('click', () => {
        if (confirm('Clear all messages?')) {
            chatMessages.innerHTML = '';
            welcomeScreen.classList.remove('hidden');
            messageCount = 0;
        }
    });
}

// Theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Quick topics button
if (attachBtn) {
    attachBtn.addEventListener('click', () => {
        const quickTopics = [
            'Explain time complexity with examples',
            'What is the difference between array and linked list?',
            'How does merge sort work?',
            'Explain binary search tree operations',
            'What is dynamic programming?'
        ];
        
        const randomTopic = quickTopics[Math.floor(Math.random() * quickTopics.length)];
        userInput.value = randomTopic;
        userInput.focus();
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        e.target !== menuToggle) {
        sidebar.classList.remove('active');
    }
});

// Focus input on load
userInput.focus();