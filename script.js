let autoMode = false;
let manualMode = false;
let emergencyMode = false;
let emergencyBlinking = null;

// Fungsi Loading
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000); // Loading selama 3 detik
}

function toggleAuto() {
  if (emergencyMode) return;
  if (!autoMode && !manualMode) {
    autoMode = true;
    updateStatus("Auto");
    document.getElementById("autoIndicator").style.backgroundColor = "green";
    document.getElementById("manualIndicator").style.backgroundColor = "gray";
    document.getElementById("stopIndicator").style.backgroundColor = "gray";
  }
}

function toggleManual() {
  if (emergencyMode) return;
  if (!manualMode && !autoMode) {
    manualMode = true;
    updateStatus("Manual");
    document.getElementById("manualIndicator").style.backgroundColor = "yellow";
    document.getElementById("autoIndicator").style.backgroundColor = "gray";
    document.getElementById("stopIndicator").style.backgroundColor = "gray";
  }
}

function stopMode() {
  if (emergencyMode) return;
  if (autoMode || manualMode) {
    autoMode = false;
    manualMode = false;
    updateStatus("Stopped");
    document.getElementById("autoIndicator").style.backgroundColor = "gray";
    document.getElementById("manualIndicator").style.backgroundColor = "gray";
    document.getElementById("stopIndicator").style.backgroundColor = "red";
  }
}

function toggleEmergency() {
  if (!emergencyMode) {
    emergencyMode = true;
    autoMode = false;
    manualMode = false;
    updateStatus("Emergency");
    disableButtons();
    stopAllIndicators();
    startEmergencyBlink();
  } else {
    emergencyMode = false;
    enableButtons();
    stopEmergencyBlink();
    stopMode();
  }
}

function startEmergencyBlink() {
  let indicator = document.getElementById("emergencyIndicator");
  emergencyBlinking = setInterval(() => {
    indicator.style.backgroundColor = (indicator.style.backgroundColor === "red") ? "gray" : "red";
  }, 500);
}

function stopEmergencyBlink() {
  clearInterval(emergencyBlinking);
  document.getElementById("emergencyIndicator").style.backgroundColor = "gray";
}

function stopAllIndicators() {
  document.getElementById("autoIndicator").style.backgroundColor = "gray";
  document.getElementById("manualIndicator").style.backgroundColor = "gray";
  document.getElementById("stopIndicator").style.backgroundColor = "gray";
}

function updateStatus(status) {
  document.getElementById("statusText").textContent = status;
}

function disableButtons() {
  document.getElementById("autoButton").disabled = true;
  document.getElementById("manualButton").disabled = true;
  document.getElementById("stopButton").disabled = true;
}

function enableButtons() {
  document.getElementById("autoButton").disabled = false;
  document.getElementById("manualButton").disabled = false;
  document.getElementById("stopButton").disabled = false;
}
