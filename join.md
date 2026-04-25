---
layout: single
title: Join Our Community
permalink: /join/
---

<div class="join-page">

  <div class="join-description">
    <p>
      There are several ways to get involved with <strong>Women in CS @ TUM</strong> — whether you just want to stay informed, grow your career network, or help shape our community.
    </p>
  </div>

  <!-- Option 1: Direct community join -->
  <div class="join-option-card">
    <div class="join-option-icon">💬</div>
    <div class="join-option-body">
      <h3>Join our WhatsApp Community</h3>
      <p>Connect with people, stay up to date with events, and be part of the conversation. Open to everyone — no verification needed.</p>
      <a href="https://chat.whatsapp.com/BSPhLQLsJYWExZ7VeNWOb6" target="_blank" rel="noopener noreferrer" class="btn-blue btn-whatsapp">
        Join Community
      </a>
    </div>
  </div>

  <!-- Option 2: Talent Pool (email verification) -->
  <div class="join-option-card">
    <div class="join-option-icon">🌟</div>
    <div class="join-option-body">
      <h3>Join the WinCS TUM Talent Pool</h3>
      <p>An exclusive group connecting TUM students with career opportunities, internships, and industry contacts curated by our network. Access requires a verified TUM email address.</p>

      <!-- Step 1: Email input -->
      <div id="step-email" class="join-verify-block">
        <div class="join-field-row">
          <input id="email-input" type="email" placeholder="your@tum.de" class="join-input" />
          <button id="send-code-btn" class="btn-blue" onclick="sendCode()">Send Code</button>
        </div>
        <p id="email-msg" class="join-msg"></p>
      </div>

      <!-- Step 2: Code input -->
      <div id="step-code" class="join-verify-block" style="display:none;">
        <p class="join-verify-hint">Check your inbox for a 6-digit code and enter it below.</p>
        <div class="join-field-row">
          <input id="code-input" type="text" inputmode="numeric" maxlength="6" placeholder="123456" class="join-input join-input--code" />
          <button id="verify-btn" class="btn-blue" onclick="verifyCode()">Verify</button>
        </div>
        <p id="code-msg" class="join-msg"></p>
      </div>

      <!-- Step 3: Talent Pool link -->
      <div id="step-join" style="display:none;">
        <p class="join-msg join-msg--ok">You're verified! Click below to join the Talent Pool group.</p>
        <a href="https://chat.whatsapp.com/IDetXVdkRLlBSOLVJQtH8t" target="_blank" rel="noopener noreferrer" class="btn-blue btn-whatsapp">
          Join Talent Pool
        </a>
      </div>

    </div>
  </div>

  <!-- Option 3: Become an organizer -->
  <div class="join-option-card">
    <div class="join-option-icon">🙋</div>
    <div class="join-option-body">
      <h3>Become an Active Organizer</h3>
      <p>Want to help shape events, run workshops, or grow our community? We recruit new organizers periodically. Stay tuned for announcements on our
        <a href="https://www.instagram.com/women.in.cs.at.tum/" target="_blank" rel="noopener noreferrer">Instagram</a>
        and in the WhatsApp Community.
      </p>
    </div>
  </div>

</div>

<script>
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUHrir0OPa6X10oy6q4wsds_tT2_iIUpuZsMGPgQs6v3GWm8AJYM482G7AF4vTeEn7/exec";

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
      document.getElementById("step-email").style.display = "none";
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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("email-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendCode();
  });
  document.getElementById("code-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") verifyCode();
  });
});
</script>
