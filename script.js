<script type="module">
  // Import Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

  // Konfigurasi Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDPwu-688WqD2Sir7a5_FWYKW9UgfroCsI",
    authDomain: "automatic-storage-system-86fc5.firebaseapp.com",
    databaseURL: "https://automatic-storage-system-86fc5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "automatic-storage-system-86fc5",
    storageBucket: "automatic-storage-system-86fc5.appspot.com",
    messagingSenderId: "480557574750",
    appId: "1:480557574750:web:4dd24fae6e33751a12a2cf",
    measurementId: "G-QD81H8QBZ2"
  };

  // Inisialisasi Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Fungsi untuk mengupdate mode ke Firebase
  function updateMode(mode) {
    set(ref(db, "status"), { mode });
  }

  // Fungsi untuk membaca mode secara real-time
  onValue(ref(db, "status"), (snapshot) => {
    if (snapshot.exists()) {
      setMode(snapshot.val().mode);
    }
  });

  // Fungsi untuk mengubah tampilan berdasarkan mode
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
    get(ref(db, "status")).then((snapshot) => {
      if (snapshot.exists() && snapshot.val().mode === "Stopped") {
        updateMode("Auto");
      }
    });
  }

  // 🚀 Fungsi Tombol Manual Mode
  function toggleManual() {
    get(ref(db, "status")).then((snapshot) => {
      if (snapshot.exists() && snapshot.val().mode === "Stopped") {
        updateMode("Manual");
      }
    });
  }

  // 🛑 Fungsi Tombol Stop
  function stopMode() {
    updateMode("Stopped");
    clearInterval(emergencyInterval);
  }

  // ⚠️ Fungsi Emergency
  function toggleEmergency() {
    get(ref(db, "status")).then((snapshot) => {
      if (snapshot.exists() && snapshot.val().mode !== "Emergency") {
        updateMode("Emergency");
      } else {
        updateMode("Stopped");
        clearInterval(emergencyInterval);
      }
    });
  }
</script>
