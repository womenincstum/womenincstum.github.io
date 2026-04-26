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

  <!-- Option 2: Talent Pool (email verification + profile) -->
  <div class="join-option-card">
    <div class="join-option-icon">🌟</div>
    <div class="join-option-body">
      <h3>Join the WinCS TUM Talent Pool</h3>
      <p>An exclusive group connecting TUM students with career opportunities, internships, and industry contacts curated by our network. Access requires a verified TUM email address.</p>

      <!-- Step 1: Email -->
      <div id="step-email" class="join-verify-block">
        <div class="join-field-row">
          <input id="email-input" type="email" placeholder="your@tum.de" class="join-input" />
          <button id="send-code-btn" class="btn-blue" onclick="sendCode()">Send Code</button>
        </div>
        <p id="email-msg" class="join-msg"></p>
      </div>

      <!-- Step 2: Profile + code -->
      <div id="step-code" class="join-verify-block" style="display:none;">
        <p class="join-verify-hint">Enter your details and the 6-digit code from your inbox.</p>

        <div class="join-profile-grid">

          <div class="join-profile-field">
            <label for="name-input">Full name</label>
            <input id="name-input" type="text" placeholder="Ada Lovelace" class="join-input" />
          </div>

          <div class="join-profile-field">
            <label for="gender-input">Gender</label>
            <select id="gender-input" class="join-input join-select">
              <option value="">— select —</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div class="join-profile-field">
            <label for="status-input">Study status</label>
            <select id="status-input" class="join-input join-select">
              <option value="">— select —</option>
              <option>Bachelor student</option>
              <option>Master student</option>
              <option>PhD student</option>
              <option>Alumni (graduated)</option>
              <option>Other</option>
            </select>
          </div>

          <div class="join-profile-field">
            <label for="field-input">Study program</label>
            <select id="field-input" class="join-input join-select" onchange="toggleOtherField()">
              <option value="">— select —</option>
              <optgroup label="Bachelor's programs">
                <option>B.Sc. Informatics</option>
                <option>B.Sc. Data Engineering and Analytics</option>
                <option>B.Sc. Information Systems</option>
                <option>B.Sc. Games Engineering</option>
                <option>B.Sc. Electrical Engineering and Information Technology</option>
                <option>B.Sc. Engineering Science</option>
                <option>B.Sc. Mathematics</option>
              </optgroup>
              <optgroup label="Master's programs">
                <option>M.Sc. Informatics</option>
                <option>M.Sc. Data Engineering and Analytics</option>
                <option>M.Sc. Information Systems</option>
                <option>M.Sc. Robotics, Cognition, Intelligence</option>
                <option>M.Sc. Computational Science and Engineering</option>
                <option>M.Sc. Biomedical Computing</option>
                <option>M.Sc. Electrical Engineering and Information Technology</option>
                <option>M.Sc. Communications Engineering</option>
                <option>M.Sc. Mathematics in Data Science</option>
                <option>M.Sc. Mathematics</option>
              </optgroup>
              <optgroup label="Other">
                <option value="Other">Other / Not listed</option>
              </optgroup>
            </select>
          </div>

          <div class="join-profile-field join-profile-field--full" id="other-field-wrap" style="display:none;">
            <label for="other-field-input">Please specify your program</label>
            <input id="other-field-input" type="text" placeholder="e.g. Exchange student, TUM Asia, …" class="join-input" />
          </div>

          <div class="join-profile-field">
            <label for="code-input">Verification code</label>
            <input id="code-input" type="text" inputmode="numeric" maxlength="6" placeholder="123456" class="join-input join-input--code" />
          </div>

        </div>

        <div class="join-field-row" style="margin-top:1rem;">
          <button id="verify-btn" class="btn-blue" onclick="verifyCode()">Verify &amp; Join</button>
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
        <a href="https://www.instagram.com/women.in.cs.at.tum/" target="_blank" rel="noopener noreferrer">Instagram</a>,
        <a href="https://www.linkedin.com/company/women-in-computer-science-tum/" target="_blank" rel="noopener noreferrer">LinkedIn</a>,
        and in the WhatsApp Community.
      </p>
    </div>
  </div>

</div>

<script>
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUHrir0OPa6X10oy6q4wsds_tT2_iIUpuZsMGPgQs6v3GWm8AJYM482G7AF4vTeEn7/exec";

function toggleOtherField() {
  const val = document.getElementById("field-input").value;
  document.getElementById("other-field-wrap").style.display = val === "Other" ? "block" : "none";
}

function setMsg(id, text, isError) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "join-msg" + (isError ? " join-msg--error" : " join-msg--ok");
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  btn.disabled = loading;
  btn.textContent = loading
    ? "Please wait…"
    : (btnId === "send-code-btn" ? "Send Code" : "Verify & Join");
}

async function sendCode() {
  const email = document.getElementById("email-input").value.trim();
  if (!email) { setMsg("email-msg", "Please enter your email address.", true); return; }
  if (!email.endsWith("@tum.de")) { setMsg("email-msg", "Please use your TUM email address (@tum.de).", true); return; }

  setLoading("send-code-btn", true);
  setMsg("email-msg", "", false);

  try {
    const res  = await fetch(SCRIPT_URL + "?action=sendCode&email=" + encodeURIComponent(email));
    const data = await res.json();
    if (data.success) {
      setMsg("email-msg", "Code sent! Check your inbox (and spam folder).", false);
      document.getElementById("step-code").style.display = "block";
      document.getElementById("name-input").focus();
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
  const email  = document.getElementById("email-input").value.trim();
  const code   = document.getElementById("code-input").value.trim();
  const name   = document.getElementById("name-input").value.trim();
  const gender = document.getElementById("gender-input").value;
  const status = document.getElementById("status-input").value;
  const fieldSelect = document.getElementById("field-input").value;
  const fieldOther  = document.getElementById("other-field-input").value.trim();
  const field = fieldSelect === "Other" ? (fieldOther || "Other") : fieldSelect;

  if (!name)   { setMsg("code-msg", "Please enter your full name.", true); return; }
  if (!gender) { setMsg("code-msg", "Please select your gender.", true); return; }
  if (!status) { setMsg("code-msg", "Please select your study status.", true); return; }
  if (!fieldSelect) { setMsg("code-msg", "Please select your study program.", true); return; }
  if (!code)   { setMsg("code-msg", "Please enter the 6-digit verification code.", true); return; }

  setLoading("verify-btn", true);
  setMsg("code-msg", "", false);

  const params = new URLSearchParams({
    action: "verifyCode",
    email, code, name, gender, status, field
  });

  try {
    const res  = await fetch(SCRIPT_URL + "?" + params.toString());
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
