// =====================================================================
// 🛰️ GEOSENSE OPERATIONS CENTER - DASHBOARD CONTROLLER JS
// Handles Leaflet mapping, REST services, modals, and logs streaming.
// =====================================================================

const API_KEY = "Geosense_DevPower_Secure_Secret_2026";
// Automatically target local running server if hosted on external domains like GitHub Pages
const API_HOST = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "" : "http://localhost:8000";
// Automatically target local running server if hosted on external domains like GitHub Pages
const API_HOST = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "" : "http://localhost:8000";
let map, alertMarker, pulseCircle;
let currentContacts = [];

// =====================================================================
// 🗺️ LEAFLET MAP HANDLER
// =====================================================================
function initMap(lat = 9.306945, lng = 76.647788) {
  // Leaflet Map Initialization with Dark Matter tiles
  map = L.map('map', {
    zoomControl: true,
    minZoom: 2,
    maxZoom: 18
  }).setView([lat, lng], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Set initial map marker
  updateMapPosition(lat, lng, false);

  // Allow clicking on map to update coords
  map.on('click', function(e) {
    document.getElementById('geo-lat').value = e.latlng.lat.toFixed(6);
    document.getElementById('geo-lng').value = e.latlng.lng.toFixed(6);
    updateMapPosition(e.latlng.lat, e.latlng.lng, true);
  });
}

function updateMapPosition(lat, lng, animated = true) {
  const position = [lat, lng];
  
  if (alertMarker) {
    alertMarker.setLatLng(position);
  } else {
    // Custom radar-ping marker icon
    const radarIcon = L.divIcon({
      className: 'animated-marker-pulse',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    alertMarker = L.marker(position, { icon: radarIcon }).addTo(map);
  }

  // Draw accuracy circle
  if (pulseCircle) {
    pulseCircle.setLatLng(position);
  } else {
    pulseCircle = L.circle(position, {
      color: '#ff3b30',
      fillColor: '#ff3b30',
      fillOpacity: 0.1,
      radius: 400,
      weight: 1
    }).addTo(map);
  }

  if (animated) {
    map.panTo(position);
  }
  
  document.getElementById('gps-coords').innerText = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
}

// Sync form GPS inputs to Map Marker
document.getElementById('geo-lat').addEventListener('change', syncCoordsToMap);
document.getElementById('geo-lng').addEventListener('change', syncCoordsToMap);

function syncCoordsToMap() {
  const lat = parseFloat(document.getElementById('geo-lat').value) || 9.306945;
  const lng = parseFloat(document.getElementById('geo-lng').value) || 76.647788;
  updateMapPosition(lat, lng, true);
}

// =====================================================================
// 🛰️ DYNAMIC DATA RETRIEVAL (REST)
// =====================================================================

async function loadSystemData() {
  try {
    const response = await fetch(API_HOST + '/api/v1/system-data', {
      headers: { 'X-API-KEY': API_KEY }
    });
    if (!response.ok) throw new Error("Failed to load operations state");
    
    const data = await response.json();
    
    // Set status indicator to Online
    const statusBadge = document.querySelector('.header-status .status-badge');
    if (statusBadge) {
      statusBadge.className = 'status-badge status-online';
      statusBadge.innerHTML = '<span class="pulse-dot"></span> OPERATIONAL';
    }
    
    // Render Contacts
    currentContacts = data.contacts;
    renderContactsTable(currentContacts);
    
    // Render Credentials Status Indicators
    updateIntegrationStatus(data.credentials);
    
    // Populate Form fields inside Creds Modal
    populateCredentialsForm(data.credentials);

    // Render Logs
    renderLogs(data.logs);
  } catch (error) {
    // Set status indicator to Offline (silent update, no annoying repeated toasts!)
    const statusBadge = document.querySelector('.header-status .status-badge');
    if (statusBadge) {
      statusBadge.className = 'status-badge status-offline';
      statusBadge.innerHTML = '<span class="pulse-dot-red"></span> DAEMON OFFLINE';
    }
    addTerminalLog("SYSTEM", "ERROR", `Core daemon connection unavailable: ${error.message}`);
  }
}

function updateIntegrationStatus(creds) {
  const indicators = {
    'integ-twilio-sms': creds.twilio_sid && creds.twilio_token && creds.twilio_from,
    'integ-twilio-call': creds.twilio_sid && creds.twilio_token && creds.twilio_from,
    'integ-sendgrid': creds.sendgrid_key && creds.sendgrid_from,
    'integ-telegram': creds.telegram_token
  };

  for (const [id, active] of Object.entries(indicators)) {
    const el = document.getElementById(id);
    if (!el) continue;
    
    const dot = el.querySelector('.integ-dot');
    const statusText = el.querySelector('.integ-meta span');
    
    if (active) {
      dot.className = 'integ-dot dot-active';
      statusText.innerText = 'Status: Active';
      statusText.className = 'text-green';
    } else {
      dot.className = 'integ-dot dot-inactive';
      statusText.innerText = 'Status: Offline (Configure)';
      statusText.className = 'text-muted';
    }
  }
}

// =====================================================================
// 👥 CONTACTS CRUD MANAGEMENT
// =====================================================================

function renderContactsTable(contacts) {
  const tbody = document.getElementById('contacts-tbody');
  tbody.innerHTML = '';

  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 20px;">No whitelisted contacts in record.</td></tr>`;
    return;
  }

  contacts.forEach(contact => {
    const initials = contact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="contact-meta-cell">
          <div class="contact-avatar">${initials}</div>
          <div class="contact-details">
            <h3>${escapeHtml(contact.name)}</h3>
            <span>${escapeHtml(contact.phone)} | ${escapeHtml(contact.email)}</span>
          </div>
        </div>
      </td>
      <td class="text-center">
        <div class="channels-cell">
          <div class="channel-pill chan-sms-icon ${contact.sms_enabled ? 'active' : ''}" title="SMS Alert"><i class="fa-solid fa-comment-sms"></i></div>
          <div class="channel-pill chan-call-icon ${contact.call_enabled ? 'active' : ''}" title="Voice Call"><i class="fa-solid fa-phone-volume"></i></div>
          <div class="channel-pill chan-email-icon ${contact.email_enabled ? 'active' : ''}" title="Email Alert"><i class="fa-solid fa-envelope"></i></div>
          <div class="channel-pill chan-telegram-icon ${contact.telegram_enabled ? 'active' : ''}" title="Telegram Alert"><i class="fa-brands fa-telegram"></i></div>
        </div>
      </td>
      <td class="text-center">
        <div class="actions-cell">
          <button class="action-icon-btn" onclick="openEditContactModal('${contact.id}')" title="Edit Contact"><i class="fa-solid fa-pencil"></i></button>
          <button class="action-icon-btn delete-btn" onclick="deleteContact('${contact.id}')" title="Delete Contact"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteContact(id) {
  if (!confirm("Are you sure you want to remove this contact from the whitelisted operations list?")) return;

  try {
    const response = await fetch(`/api/v1/contacts/${id}`, {
      method: 'DELETE',
      headers: { 'X-API-KEY': API_KEY }
    });

    if (response.ok) {
      showToast("Contact whitelisted item deleted", "success");
      loadSystemData();
    } else {
      throw new Error("Deletion rejected by endpoint");
    }
  } catch (error) {
    showToast(`Error deleting contact: ${error.message}`, "error");
  }
}

// Open modal for Adding New Contact
document.getElementById('add-contact-btn').addEventListener('click', () => {
  document.getElementById('contact-form').reset();
  document.getElementById('contact-id').value = '';
  document.getElementById('contact-modal-title').innerText = "Add Whitelisted Contact";
  openModal('contact-modal');
});

// Edit Contact Modal Launcher
function openEditContactModal(id) {
  const contact = currentContacts.find(c => c.id === id);
  if (!contact) return;

  document.getElementById('contact-id').value = contact.id;
  document.getElementById('contact-name').value = contact.name;
  document.getElementById('contact-phone').value = contact.phone;
  document.getElementById('contact-email').value = contact.email;
  document.getElementById('contact-telegram-chat-id').value = contact.telegram_chat_id || '';
  
  document.getElementById('chan-sms').checked = contact.sms_enabled;
  document.getElementById('chan-call').checked = contact.call_enabled;
  document.getElementById('chan-email').checked = contact.email_enabled;
  document.getElementById('chan-telegram').checked = contact.telegram_enabled;

  document.getElementById('contact-modal-title').innerText = "Modify Whitelisted Contact";
  openModal('contact-modal');
}

// Save/Update Contact Submit Handlers
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('contact-id').value;
  const payload = {
    name: document.getElementById('contact-name').value,
    phone: document.getElementById('contact-phone').value,
    email: document.getElementById('contact-email').value,
    telegram_chat_id: document.getElementById('contact-telegram-chat-id').value || "",
    sms_enabled: document.getElementById('chan-sms').checked,
    call_enabled: document.getElementById('chan-call').checked,
    email_enabled: document.getElementById('chan-email').checked,
    telegram_enabled: document.getElementById('chan-telegram').checked
  };

  const url = id ? `/api/v1/contacts/${id}` : '/api/v1/contacts';
  const method = id ? 'PUT' : 'POST';

  try {
    const response = await fetch(API_HOST + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast(id ? "Contact whitelisting modified" : "New contact whitelisted", "success");
      closeModal('contact-modal');
      loadSystemData();
    } else {
      const err = await response.json();
      throw new Error(err.detail || "Server rejected submit payload");
    }
  } catch (error) {
    showToast(`Failed: ${error.message}`, "error");
  }
});

// =====================================================================
// 🔑 CREDENTIALS SYSTEM UPDATE
// =====================================================================

function populateCredentialsForm(creds) {
  document.getElementById('twilio-sid').value = creds.twilio_sid || '';
  document.getElementById('twilio-token').value = creds.twilio_token || '';
  document.getElementById('twilio-from').value = creds.twilio_from || '';
  document.getElementById('sendgrid-key').value = creds.sendgrid_key || '';
  document.getElementById('sendgrid-from').value = creds.sendgrid_from || '';
  document.getElementById('telegram-token').value = creds.telegram_token || '';
  document.getElementById('telegram-chat-id').value = creds.telegram_chat_id || '';
}

document.getElementById('edit-credentials-btn').addEventListener('click', () => {
  openModal('credentials-modal');
});

document.getElementById('credentials-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    twilio_sid: document.getElementById('twilio-sid').value,
    twilio_token: document.getElementById('twilio-token').value,
    twilio_from: document.getElementById('twilio-from').value,
    sendgrid_key: document.getElementById('sendgrid-key').value,
    sendgrid_from: document.getElementById('sendgrid-from').value,
    telegram_token: document.getElementById('telegram-token').value,
    telegram_chat_id: document.getElementById('telegram-chat-id').value
  };

  try {
    const response = await fetch(API_HOST + '/api/v1/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast("Gateways credentials loaded securely", "success");
      closeModal('credentials-modal');
      loadSystemData();
    } else {
      throw new Error("Server failed to commit new key sets");
    }
  } catch (error) {
    showToast(`Failure: ${error.message}`, "error");
  }
});

// =====================================================================
// 🚨 SAFETY MECHANISMS & TRIGGER EVENT
// =====================================================================

const safetySwitch = document.getElementById('safety-switch');
const emergencyBtn = document.getElementById('emergency-btn');
const safetyText = document.getElementById('safety-status-text');

safetySwitch.addEventListener('change', function() {
  if (this.checked) {
    emergencyBtn.disabled = false;
    emergencyBtn.className = 'emergency-button armed';
    safetyText.innerText = 'ARMED';
    safetyText.className = 'safety-text armed';
    showToast("EMERGENCY SYSTEM ARMED. Safety bypass deactivated.", "warning");
    addTerminalLog("SYSTEM", "WARN", "Dispatcher trigger mechanism fully armed. Safety overrides disabled.");
  } else {
    emergencyBtn.disabled = true;
    emergencyBtn.className = 'emergency-button locked';
    safetyText.innerText = 'DISARMED';
    safetyText.className = 'safety-text disarmed';
    showToast("Safety lock engaged.", "info");
    addTerminalLog("SYSTEM", "INFO", "Safety triggers active. Central console locked.");
  }
});

emergencyBtn.addEventListener('click', async () => {
  if (emergencyBtn.disabled) return;
  
  // Visual Loading Feedback state
  emergencyBtn.disabled = true;
  const originalText = emergencyBtn.querySelector('.btn-text').innerText;
  emergencyBtn.querySelector('.btn-text').innerText = "DISPATCHING...";
  addTerminalLog("SYSTEM", "WARN", "Nuclear Manual Trigger deployed. Broadcasting packets...");

  const payload = {
    event_source: document.getElementById('event-source').value,
    severity: document.getElementById('severity-level').value,
    message: document.getElementById('alert-message').value,
    latitude: parseFloat(document.getElementById('geo-lat').value) || 9.306945,
    longitude: parseFloat(document.getElementById('geo-lng').value) || 76.647788
  };

  try {
    const response = await fetch(API_HOST + '/api/v1/trigger-emergency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      showToast("🚨 EMERGENCY PACKETS DISPATCHED SUCCESSFULLY", "success");
      addTerminalLog("ROUTER", "SUCCESS", `Emergency Broadcast routed! Channels triggered.`);
      
      // Print detailed execution logs
      if (result.execution_log && Array.isArray(result.execution_log)) {
        result.execution_log.forEach(logLine => {
          const type = logLine.includes("failed") ? "ERROR" : "SUCCESS";
          addTerminalLog("DISPATCH", type, logLine);
        });
      }
    } else {
      throw new Error(result.detail || "Alert rejected by server.");
    }
  } catch (error) {
    showToast(`Dispatch failed: ${error.message}`, "error");
    addTerminalLog("ROUTER", "ERROR", `Broadcast error: ${error.message}`);
  } finally {
    // Re-engage safety & reset
    safetySwitch.checked = false;
    emergencyBtn.className = 'emergency-button locked';
    safetyText.innerText = 'DISARMED';
    safetyText.className = 'safety-text disarmed';
    emergencyBtn.querySelector('.btn-text').innerText = originalText;
    
    // Reload database state to fetch latest persistent logs
    loadSystemData();
  }
});

// =====================================================================
// 💻 OPERATIONAL LOGS TERMINAL
// =====================================================================

function renderLogs(logs) {
  const terminal = document.getElementById('terminal-logs');
  terminal.innerHTML = '';

  if (logs.length === 0) {
    terminal.innerHTML = `<div class="terminal-line"><span class="timestamp">[SYSTEM STARTED]</span> Terminal ready. Incoming transaction payloads will print below.</div>`;
    return;
  }

  logs.forEach(log => {
    addTerminalLogToDOM(log.timestamp, log.event_source, log.severity, log.message);
  });
  
  scrollToBottom('terminal-logs');
}

function addTerminalLog(source, severity, message) {
  const now = new Date().toISOString();
  addTerminalLogToDOM(now, source, severity, message);
  scrollToBottom('terminal-logs');
}

function addTerminalLogToDOM(timestamp, source, severity, message) {
  const terminal = document.getElementById('terminal-logs');
  
  // Format Timestamp
  const dateObj = new Date(timestamp);
  const timeStr = dateObj.toTimeString().split(' ')[0] + '.' + String(dateObj.getMilliseconds()).padStart(3, '0');
  
  const line = document.createElement('div');
  line.className = 'terminal-line';
  
  let tagClass = 'tag-info';
  if (severity === 'SUCCESS') tagClass = 'tag-success';
  if (severity === 'ERROR' || severity === 'CRITICAL') tagClass = 'tag-error';
  if (severity === 'WARN' || severity === 'WARNING') tagClass = 'tag-warn';

  line.innerHTML = `
    <span class="timestamp">[${timeStr}]</span>
    <span class="tag ${tagClass}">${severity}</span>
    <span class="source text-cyan">&lt;${escapeHtml(source)}&gt;</span>
    <span class="message">${escapeHtml(message)}</span>
  `;
  terminal.appendChild(line);
}

document.getElementById('clear-logs-btn').addEventListener('click', async () => {
  if (!confirm("Are you sure you want to purge all incident logs from the database permanently?")) return;
  try {
    const response = await fetch(API_HOST + '/api/v1/logs/clear', {
      method: 'DELETE',
      headers: { 'X-API-KEY': API_KEY }
    });
    if (response.ok) {
      showToast("Historical incident logs purged", "success");
      loadSystemData();
    }
  } catch (error) {
    showToast("Purge request rejected", "error");
  }
});

// =====================================================================
// 💻 DEVELOPER API SANDBOX INTERACTION
// =====================================================================

// Handle code tabs switching
const tabButtons = document.querySelectorAll('.sandbox-tab-btn');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state
    tabButtons.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    // Add active state to clicked button & target pane
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`).classList.add('active');
  });
});

// Copy Sandbox Code Snippet
document.getElementById('copy-sandbox-code').addEventListener('click', () => {
  const activePane = document.querySelector('.tab-pane.active pre code');
  if (!activePane) return;
  
  navigator.clipboard.writeText(activePane.innerText)
    .then(() => showToast("Snippet copied to Clipboard", "info"))
    .catch(err => showToast("Failed to copy snippet", "error"));
});

// Test Endpoint Trigger inside Sandbox (Interactive test)
document.getElementById('test-sandbox-endpoint').addEventListener('click', async () => {
  showToast("Dispatching sandbox test payload...", "info");
  
  const payload = {
    event_source: "Sandbox Test Engine",
    severity: "SYSTEM WARNING",
    message: "Trigger simulated from inside the Developer API sandbox pane.",
    latitude: parseFloat(document.getElementById('geo-lat').value) || 9.306945,
    longitude: parseFloat(document.getElementById('geo-lng').value) || 76.647788
  };

  try {
    const response = await fetch(API_HOST + '/api/v1/trigger-emergency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (response.ok) {
      showToast("Sandbox API Broadcast complete!", "success");
      loadSystemData();
    } else {
      throw new Error(result.detail || "Server rejected sandbox trigger");
    }
  } catch (error) {
    showToast(`Sandbox trigger failed: ${error.message}`, "error");
  }
});

// =====================================================================
// 🚪 MODAL HANDLERS & UTILS
// =====================================================================

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Click outside modal content to close it
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Switch tabs within the credentials modal
function switchCredTab(tabId) {
  const tabs = document.querySelectorAll('#credentials-modal .cred-tab-btn');
  const panes = document.querySelectorAll('#credentials-modal .cred-tab-content');
  
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('onclick').includes(tabId)) {
      tab.classList.add('active');
    }
  });

  panes.forEach(pane => {
    pane.classList.remove('active');
  });
  document.getElementById(`cred-${tabId}`).classList.add('active');
}

// Toast notification rendering engine
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '<i class="fa-solid fa-circle-info"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation"></i>';
  if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.style.animation = 'slide-out 0.3s forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4000);
}

// Helper: Escape HTML to prevent injection issues in console logs
function escapeHtml(string) {
  if (!string) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(string).replace(/[&<>"']/g, function(m) { return map[m]; });
}

function scrollToBottom(id) {
  const el = document.getElementById(id);
  el.scrollTop = el.scrollHeight;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initMap(9.306945, 76.647788);
  loadSystemData();
  
  // Set up periodic logs refresh (every 5 seconds) to catch Watch triggers dynamically
  setInterval(loadSystemData, 5000);
});
