importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Suas credenciais do Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB8dULHM3F0HEZ4PohJG0V1kbd23j8KIRk",
  appId: "1:892205952596:android:fb79cf61f9b42bd601c7c1",
  messagingSenderId: "892205952596",
  projectId: "ummlotjenctwanxtibeh",
  storageBucket: "ummlotjenctwanxtibeh.appspot.com",
});

const messaging = firebase.messaging();

// 🔥 LÓGICA DE RECEBIMENTO EM BACKGROUND
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recebeu mensagem em background ', payload);

  // Extraímos os dados enviados pela Vercel
  const notificationTitle = payload.data.nome || "Nova mensagem";
  const notificationOptions = {
    body: payload.data.tipo === 'chat_message'
          ? "Nova mensagem sussurrada"
          : "Chamada de voz recebida",
    icon: '/icons/Icon-192.png', // Certifique-se que este caminho existe na sua pasta web
    badge: '/icons/Icon-192.png',
    tag: payload.data.tipo, // Evita empilhar várias notificações iguais
    data: payload.data // Salva os dados para usar no clique
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 🔥 LÓGICA DE CLIQUE NA NOTIFICAÇÃO (PARA ABRIR O SITE/APP)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // URL do seu app (Vercel ou domínio próprio)
  const urlToOpen = self.location.origin;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // Se o app já estiver aberto, foca nele
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não estiver aberto, abre uma nova aba
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});