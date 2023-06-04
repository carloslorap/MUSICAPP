import {getApp,getApps,initializeApp} from 'firebase/app'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCxB1LeJQHXBxgHUNIwwBgxwibr-jjEcvI",
    authDomain: "musicapp-504e9.firebaseapp.com",
    projectId: "musicapp-504e9",
    storageBucket: "musicapp-504e9.appspot.com",
    messagingSenderId: "217601099988",
    appId: "1:217601099988:web:76a7d7f275881c43505341",
    measurementId: "G-N34VK9PMGT"
  };

  const app =getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const storage = getStorage(app);
  export { app,storage  }