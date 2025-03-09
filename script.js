// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPwu-688WqD2Sir7a5_FWYKW9UgfroCsI",
  authDomain: "automatic-storage-system-86fc5.firebaseapp.com",
  databaseURL: "https://automatic-storage-system-86fc5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "automatic-storage-system-86fc5",
  storageBucket: "automatic-storage-system-86fc5.firebasestorage.app",
  messagingSenderId: "480557574750",
  appId: "1:480557574750:web:4dd24fae6e33751a12a2cf",
  measurementId: "G-QD81H8QBZ2"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔄 Animasi Loading
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 2000);
}

// ⬇️ Fungsi menulis ke Firebase
function updateFirebase(mode) {
  db.ref("status").set({ mode });
}

// ⬆️ Realtime Listener untuk membaca data Firebase
db.ref("status").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) setMode(data.mode);
});

// 🚦 Fungsi untuk mengubah tampilan mode
function setMode(mode) {
  document.getElementById("statusText").textContent = mode;
  
  // Reset Semua Lampu
  document.getElementById("autoIndicator").style.backgroundColor = "gray";
  document.getElementById("manualIndicator").style.backgroundColor = "gray";
  document.getElementById("stopIndicator").style.backgroundColor = "gray";
  document.getElementById("emergencyIndicator").style.backgroundColor = "gray";

  if (mode === "Auto") {
    document.getElementById("autoIndicator").style.backgroundColor = "green";
  } else if (mode === "Manual") {
    document.getElementById("manualIndicator").style.backgroundColor = "yellow";
  } else if (mode === "Stopped") {
    document.getElementById("stopIndicator").style.backgroundColor = "red";
  } else if (mode === "Emergency") {
    startEmergencyBlink();
  }
}

// 🟢🔴 Flip-Flop Emergency (Kedip-Kedip)
let emergencyInterval;
function startEmergencyBlink() {
  clearInterval(emergencyInterval);
  let isOn = false;
  emergencyInterval = setInterval(() => {
    document.getElementById("emergencyIndicator").style.backgroundColor = isOn ? "red" : "gray";
    isOn = !isOn;
  }, 500);
}

// 🚀 Fungsi Tombol Auto Mode
function toggleAuto() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode === "Stopped") updateFirebase("Auto");
  });
}

// 🚀 Fungsi Tombol Manual Mode
function toggleManual() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode === "Stopped") updateFirebase("Manual");
  });
}

// 🛑 Fungsi Tombol Stop
function stopMode() {
  updateFirebase("Stopped");
  clearInterval(emergencyInterval);
}

// ⚠️ Fungsi Emergency
function toggleEmergency() {
  db.ref("status").once("value").then((snapshot) => {
    if (snapshot.val()?.mode !== "Emergency") {
      updateFirebase("Emergency");
    } else {
      updateFirebase("Stopped");
      clearInterval(emergencyInterval);
    }
  });
}
