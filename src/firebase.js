import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted, onUnmounted } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyB3pkuXwjBnDvVOWQVYqqfMfnJnoU4Z4Tc",
  authDomain: "trading-daily-13b94.firebaseapp.com",
  projectId: "trading-daily-13b94",
  storageBucket: "trading-daily-13b94.appspot.com",
  messagingSenderId: "915178074465",
  appId: "1:915178074465:web:7e759c2f1e70675089d520",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return null;
  }
};


const loginWithEmail = async (email, password) => {


  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return null;
  
  } 
};

const logOut = async () => {
  await signOut(auth);
};

const useAuth = () => {
  const user = ref(null);

  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return { user };
};

export { auth, signInWithGoogle, onAuthStateChanged, logOut, signOut, loginWithEmail, db, useAuth};
