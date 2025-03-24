import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfufyiafYNolyMrpxD7NUhnw4LLtuxUqU",
  authDomain: "krasinfo-cbfa3.firebaseapp.com",
  projectId: "krasinfo-cbfa3",
  storageBucket: "krasinfo-cbfa3.firebasestorage.app",
  messagingSenderId: "25152861738",
  appId: "1:25152861738:web:03583cd945c8abcc347553",
  measurementId: "G-D875BM3G7T"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app); 