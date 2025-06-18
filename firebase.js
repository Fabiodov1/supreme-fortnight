const firebaseConfig = {
  apiKey: "AIzaSyACapnCyHVKUNopuj9BTRnvGMjckCRVeos",
  authDomain: "mingosluis-e9f53.firebaseapp.com",
  projectId: "mingosluis-e9f53",
  storageBucket: "mingosluis-e9f53.appspot.com",
  messagingSenderId: "463530576008",
  appId: "1:463530576008:web:f8cdd42951935e0cdcb73d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
window.firebaseAuth = firebase.auth();
window.firebaseDb = firebase.database();
