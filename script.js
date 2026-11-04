
// OUR SPACE ♡
// Supabase connection setup

const SUPABASE_URL = "https://ewmctpkfjjxxcindwhhy.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_M6QM8sXCJTM3XBRajKM-Cw_LFJnd5VI";

// Initialize Supabase
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Calculate days together
const startDate = new Date(2024, 9, 12);
const today = new Date();

const days = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
);

const daysElement = document.getElementById("days-together");

if (daysElement) {
    daysElement.textContent = days + " Days ♡";
}

// Get current time
function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Temporary local-only demo message.
// This does NOT send messages to Supabase.
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const messagesArea = document.querySelector(".messages");

if (chatForm && messageInput && messagesArea) {
    chatForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const text = messageInput.value.trim();
        if (!text) return;

        const message = document.createElement("div");
        message.className = "message sent";

        message.appendChild(document.createTextNode(text));

        const time = document.createElement("small");
        time.textContent = getCurrentTime();
        message.appendChild(time);

        messagesArea.appendChild(message);
        messageInput.value = "";
        messagesArea.scrollTop = messagesArea.scrollHeight;
    });
}

console.log("Our Space ♡ Supabase client initialized!");
