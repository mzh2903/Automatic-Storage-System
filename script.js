// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqiOw_mb-84K2K_Zjx_HP5nGSk9_w_p2E",
  authDomain: "automatic-storage-system-c3ddf.firebaseapp.com",
  databaseURL: "https://automatic-storage-system-c3ddf-default-rtdb.firebaseio.com",
  projectId: "automatic-storage-system-c3ddf",
  storageBucket: "automatic-storage-system-c3ddf.firebasestorage.app",
  messagingSenderId: "987470488515",
  appId: "1:987470488515:web:36d5de0507aee164249376",
  measurementId: "G-TWE9XEH31R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Fungsi Loading
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
}

// Fungsi Menulis Status ke Firebase
function updateFirebase(status) {
  db.ref("status").set({ mode: status });
}

// Fungsi Membaca Status dari Firebase (Realtime)
db.ref("status").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) setMode(data.mode);
});

// Fungsi Mengatur Mode
function setMode(mode) {
  document.getElementById("statusText").textContent = mode;
  document.getElementById("autoIndicator").style.backgroundColor = (mode === "Auto") ? "green" : "gray";
  document.getElementById("manualIndicator").style.backgroundColor = (mode === "Manual") ? "yellow" : "gray";
  document.getElementById("stopIndicator").style.backgroundColor = (mode === "Stopped") ? "red" : "gray";
  document.getElementById("emergencyIndicator").style.backgroundColor = (mode === "Emergency") ? "red" : "gray";
}

// Fungsi Mode Auto
function toggleAuto() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode === "Stopped") updateFirebase("Auto");
  });
}

// Fungsi Mode Manual
function toggleManual() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode === "Stopped") updateFirebase("Manual");
  });
}

// Fungsi Stop
function stopMode() {
  updateFirebase("Stopped");
}

// Fungsi Emergency
function toggleEmergency() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode !== "Emergency") {
      updateFirebase("Emergency");
    } else {
      updateFirebase("Stopped");
    }
  });
}
