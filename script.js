
// OUR SPACE ♡
// Supabase connection

const SUPABASE_URL = "https://ewmctpkfjjxxcindwhhy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_M6QM8sXCJTM3XBRajKM-Cw_LFJnd5VI";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Main elements
const loginScreen = document.getElementById("login-screen");
const appScreen = document.querySelector(".app");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// Password recovery state
let recoveryMode =
    window.location.hash.includes("type=recovery") ||
    window.location.search.includes("type=recovery");

let recoveryPanel = null;

// Show login or app
function showLogin() {
    loginScreen.style.display = "flex";
    appScreen.style.display = "none";
}

function showApp() {
    loginScreen.style.display = "none";
    appScreen.style.display = "flex";
}

// Create password recovery screen
function showRecoveryScreen() {
    recoveryMode = true;

    showLogin();

    if (loginForm) {
        loginForm.style.display = "none";
    }

    if (loginError) {
        loginError.textContent = "";
    }

    if (recoveryPanel) return;

    recoveryPanel = document.createElement("form");
    recoveryPanel.style.marginTop = "20px";

    recoveryPanel.innerHTML = `
        <h2>Set your new password ♡</h2>

        <p>Choose a new password for Our Space.</p>

        <input
            type="password"
            id="new-password"
            placeholder="New password"
            minlength="8"
            required
            style="display:block;width:100%;padding:12px;margin:12px 0;"
        >

        <input
            type="password"
            id="confirm-password"
            placeholder="Confirm new password"
            minlength="8"
            required
            style="display:block;width:100%;padding:12px;margin:12px 0;"
        >

        <button type="submit" style="padding:12px 20px;">
            Save New Password ♡
        </button>

        <p id="recovery-message"></p>
    `;

    loginScreen.appendChild(recoveryPanel);

    recoveryPanel.addEventListener("submit", async function(event) {
        event.preventDefault();

        const password =
            document.getElementById("new-password").value;

        const confirmPassword =
            document.getElementById("confirm-password").value;

        const message =
            document.getElementById("recovery-message");

        if (password.length < 8) {
            message.textContent =
                "Password must contain at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.textContent = "Updating password...";

        const { error } = await supabaseClient.auth.updateUser({
            password: password
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent = "Password saved successfully! ♡";

        recoveryMode = false;

        if (loginForm) {
            loginForm.style.display = "block";
        }

        recoveryPanel.remove();
        recoveryPanel = null;

        showApp();
    });
}

// Listen for Supabase authentication events
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
        showRecoveryScreen();
        return;
    }

    if (recoveryMode) {
        showRecoveryScreen();
        return;
    }

    if (session) {
        showApp();
    } else {
        showLogin();
    }
});

// Check existing login
async function checkLogin() {
    if (recoveryMode) {
        showRecoveryScreen();
        return;
    }

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error) {
        console.error("Session error:", error.message);
        showLogin();
        return;
    }

    if (data.session) {
        showApp();
    } else {
        showLogin();
    }
}

// Normal email and password login
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email =
            document.getElementById("login-email").value.trim();

        const password =
            document.getElementById("login-password").value;

        loginError.textContent = "Signing in...";

        const { error } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            loginError.textContent = error.message;
            return;
        }

        loginError.textContent = "";
        showApp();
    });
}

// Days together
const startDate = new Date(2024, 9, 12);
const today = new Date();

const days = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
);

const daysElement =
    document.getElementById("days-together");

if (daysElement) {
    daysElement.textContent = days + " Days ♡";
}

// Chat demo (still local-only; not saved to Supabase)
function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

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

console.log("Our Space ♡ initialized!");

checkLogin();
