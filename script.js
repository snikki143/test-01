
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

// Test Supabase connection
async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("conversations")
        .select("id")
        .limit(1);

    if (error) {
        console.error("Supabase connection test failed:", error.message);
        return;
    }

    console.log("Supabase database connection successful!");
    console.log("Conversation records found:", data.length);
}

testSupabaseConnection();


// OUR SPACE - LOGIN SYSTEM

const loginScreen = document.getElementById("login-screen");
const appScreen = document.querySelector(".app");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// Check whether a user is already logged in
async function checkLogin() {
    const { data: { session } } =
        await supabaseClient.auth.getSession();

    if (session) {
        loginScreen.style.display = "none";
        appScreen.style.display = "flex";
    } else {
        loginScreen.style.display = "flex";
        appScreen.style.display = "none";
    }
}

// Login with email and password
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    loginError.textContent = "Signing in...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        loginError.textContent = error.message;
        return;
    }

    loginError.textContent = "";

    loginScreen.style.display = "none";
    appScreen.style.display = "flex";

    console.log("Welcome to Our Space ♡");
});

// Listen for login and logout changes
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        loginScreen.style.display = "none";
        appScreen.style.display = "flex";
    } else {
        loginScreen.style.display = "flex";
        appScreen.style.display = "none";
    }
});

// Check login when website opens
checkLogin();

