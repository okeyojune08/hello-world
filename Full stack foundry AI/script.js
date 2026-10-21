const messagesEl = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const clearBtn = document.getElementById("clearBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const WELCOME = "Hi, I'm June! Ask me a question or tap one of the examples below.";

/* ---------- Mobile menu ---------- */
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Messages ---------- */
function addMessage(text, sender, extraClass = "") {
  const div = document.createElement("div");
  div.className = `msg ${sender} ${extraClass}`.trim();
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

/* ---------- Replies ----------
   This demo answers from the list below (no server needed).
   To connect a real AI, replace getReply() with a fetch() call
   to your own backend that talks to an AI service. Never put
   an API key in front-end code. */
const replies = [
  { keys: ["hello", "hi", "hey"], text: "Hello! Nice to meet you. What would you like to talk about?" },
  { keys: ["help", "can you"], text: "I can explain topics, suggest study tips, brainstorm ideas and keep you company with a joke or two." },
  { keys: ["ai", "artificial"], text: "AI is software that learns patterns from lots of examples, so it can answer questions, translate, or recognise images. Think of it as a very fast student that has read a lot." },
  { keys: ["study", "exam", "learn"], text: "Try 25 minutes of focused study, then a 5 minute break. Test yourself instead of rereading, and explain the topic out loud as if teaching a friend." },
  { keys: ["joke", "funny"], text: "Why did the computer go to the doctor? It caught a virus!" },
  { keys: ["thank"], text: "You're welcome! Ask me anything else." }
];

function getReply(text) {
  const t = text.toLowerCase();
  const match = replies.find(r => r.keys.some(k => new RegExp(`\\b${k}\\b`).test(t)));
  return match
    ? match.text
    : "Good question! I'm a demo right now, so my answers are limited. Try asking about AI, studying, or what I can help with.";
}

function sendMessage(text) {
  text = text.trim();
  if (!text) return;

  addMessage(text, "user");
  const typing = addMessage("June is typing...", "bot", "typing");

  setTimeout(() => {
    typing.remove();
    addMessage(getReply(text), "bot");
  }, 700);
}

/* ---------- Events ---------- */
form.addEventListener("submit", e => {
  e.preventDefault();
  sendMessage(input.value);
  input.value = "";
  input.focus();
});

document.querySelectorAll(".chip").forEach(chip =>
  chip.addEventListener("click", () => sendMessage(chip.textContent))
);

clearBtn.addEventListener("click", () => {
  messagesEl.innerHTML = "";
  addMessage(WELCOME, "bot");
});

addMessage(WELCOME, "bot");