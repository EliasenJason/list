// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, query,getDocs,collection, where, addDoc } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebase);

const db = getFirestore(firebase)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth,googleProvider)
    const user = res.user
    const q = query(collection(db, "users"),where("uid", "==",user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert("password reset link sent!")
  } catch (err) {
    console.error(err)
    alert (err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
}