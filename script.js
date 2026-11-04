
// OUR SPACE ♡ - JavaScript

const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const messagesArea = document.querySelector(".messages");

// Calculate days together
const startDate = new Date(2024, 9, 12);
const today = new Date();

const days = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
);

document.getElementById("days-together").textContent =
    days + " Days ♡";

// Get current time
function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Create a new message
function sendMessage(event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (!text) return;

    // Create message bubble
    const message = document.createElement("div");
    message.className = "message sent";

    // Message text
    const messageText = document.createTextNode(text);
    message.appendChild(messageText);

    // Timestamp
    const time = document.createElement("small");
    time.textContent = getCurrentTime() + " ✓";
    message.appendChild(time);

    // Add message to chat
    messagesArea.appendChild(message);

    // Clear input
    messageInput.value = "";

    // Scroll to latest message
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Listen for message submission
chatForm.addEventListener("submit", sendMessage);

console.log("Our Space ♡ is ready!");

