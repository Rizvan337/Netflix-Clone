import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getFirestore,addDoc,collection} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBVs5G1ACI30tXcS_loapMFJ9lUOXyZLMs",
  authDomain: "netflix-clone-b1ff9.firebaseapp.com",
  projectId: "netflix-clone-b1ff9",
  storageBucket: "netflix-clone-b1ff9.firebasestorage.app",
  messagingSenderId: "847739279926",
  appId: "1:847739279926:web:f2540d54655aea96c19697"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name,email,password)=>{
    try {
       const res =  await createUserWithEmailAndPassword(auth,email,password)
       const user = res.user
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}