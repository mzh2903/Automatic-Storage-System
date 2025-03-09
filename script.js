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

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Loading Screen
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
  }, 3000);
}

// Perbarui status ke Firebase
function updateStatus(status) {
  db.ref("status").set({ mode: status });
}

// Realtime Update dari Firebase
db.ref("status").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) setMode(data.mode);
});

// Set Mode di UI
function setMode(mode) {
  document.getElementById("statusText").textContent = mode;
}

// Fungsi Tombol
function toggleAuto() { updateStatus("Auto"); }
function toggleManual() { updateStatus("Manual"); }
function stopMode() { updateStatus("Stopped"); }
function toggleEmergency() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode !== "Emergency") updateStatus("Emergency");
    else updateStatus("Stopped");
  });
}
