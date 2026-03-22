importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Suas credenciais do Firebase (as mesmas do seu main.dart)
firebase.initializeApp({
  apiKey: "AIzaSyB8dULHM3F0HEZ4PohJG0V1kbd23j8KIRk",
  appId: "1:892205952596:android:fb79cf61f9b42bd601c7c1",
  messagingSenderId: "892205952596",
  projectId: "ummlotjenctwanxtibeh",
  storageBucket: "ummlotjenctwanxtibeh.appspot.com",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recebeu mensagem em background ', payload);
});