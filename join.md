---
layout: single
title: Join Our Community
permalink: /join/
---

<div class="join-page">

  <div class="join-description">
    <p>
      Our <strong>WhatsApp Community</strong> is the best way to stay connected with Women in CS @ TUM.
      Get notified about upcoming events, share opportunities, and connect with fellow members between events.
    </p>
    <p>
      To keep the space welcoming and relevant, access is verified via your TUM email address (@tum.de).
      Enter your email below to receive a one-time code, then use it to reveal the join link.
    </p>
  </div>

  <!-- Step 1: Email input -->
  <div id="step-email" class="join-card">
    <h3>Step 1 — Verify your email</h3>
    <p>Enter your email address and we'll send you a 6-digit verification code.</p>
    <div class="join-field-row">
      <input id="email-input" type="email" placeholder="your@tum.de" class="join-input" />
      <button id="send-code-btn" class="btn-blue" onclick="sendCode()">Send Code</button>
    </div>
    <p id="email-msg" class="join-msg"></p>
  </div>

  <!-- Step 2: Code input (hidden until code is sent) -->
  <div id="step-code" class="join-card" style="display:none;">
    <h3>Step 2 — Enter verification code</h3>
    <p>Check your inbox for a 6-digit code and enter it below.</p>
    <div class="join-field-row">
      <input id="code-input" type="text" inputmode="numeric" maxlength="6" placeholder="123456" class="join-input join-input--code" />
      <button id="verify-btn" class="btn-blue" onclick="verifyCode()">Verify</button>
    </div>
    <p id="code-msg" class="join-msg"></p>
  </div>

  <!-- Step 3: WhatsApp link (hidden until verified) -->
  <div id="step-join" class="join-card" style="display:none;">
    <h3>You're verified!</h3>
    <p>Click the button below to join our WhatsApp Community.</p>
    <a id="whatsapp-link" href="#" target="_blank" rel="noopener noreferrer" class="btn-blue btn-whatsapp">
      Join WhatsApp Community
    </a>
  </div>

</div>

<script>
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUHrir0OPa6X10oy6q4wsds_tT2_iIUpuZsMGPgQs6v3GWm8AJYM482G7AF4vTeEn7/exec";
const WHATSAPP_URL = "https://chat.whatsapp.com/IDetXVdkRLlBSOLVJQtH8t";

function setMsg(id, text, isError) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "join-msg" + (isError ? " join-msg--error" : " join-msg--ok");
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  btn.disabled = loading;
  btn.textContent = loading ? "Please wait…" : (btnId === "send-code-btn" ? "Send Code" : "Verify");
}

async function sendCode() {
  const email = document.getElementById("email-input").value.trim();
  if (!email) { setMsg("email-msg", "Please enter your email address.", true); return; }
  if (!email.endsWith("@tum.de")) { setMsg("email-msg", "Please use your TUM email address (@tum.de).", true); return; }

  setLoading("send-code-btn", true);
  setMsg("email-msg", "", false);

  try {
    const res = await fetch(SCRIPT_URL + "?action=sendCode&email=" + encodeURIComponent(email));
    const data = await res.json();
    if (data.success) {
      setMsg("email-msg", "Code sent! Check your inbox (and spam folder).", false);
      document.getElementById("step-code").style.display = "block";
      document.getElementById("code-input").focus();
    } else {
      setMsg("email-msg", data.message || "Something went wrong. Please try again.", true);
    }
  } catch (e) {
    setMsg("email-msg", "Network error. Please try again.", true);
  } finally {
    setLoading("send-code-btn", false);
  }
}

async function verifyCode() {
  const email = document.getElementById("email-input").value.trim();
  const code  = document.getElementById("code-input").value.trim();
  if (!code) { setMsg("code-msg", "Please enter the 6-digit code.", true); return; }

  setLoading("verify-btn", true);
  setMsg("code-msg", "", false);

  try {
    const res = await fetch(
      SCRIPT_URL + "?action=verifyCode&email=" + encodeURIComponent(email) + "&code=" + encodeURIComponent(code)
    );
    const data = await res.json();
    if (data.success) {
      document.getElementById("step-code").style.display = "none";
      document.getElementById("whatsapp-link").href = WHATSAPP_URL;
      document.getElementById("step-join").style.display = "block";
    } else {
      setMsg("code-msg", data.message || "Incorrect code. Please try again.", true);
      setLoading("verify-btn", false);
    }
  } catch (e) {
    setMsg("code-msg", "Network error. Please try again.", true);
    setLoading("verify-btn", false);
  }
}

// Allow Enter key to submit
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("email-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendCode();
  });
  document.getElementById("code-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") verifyCode();
  });
});
</script>
