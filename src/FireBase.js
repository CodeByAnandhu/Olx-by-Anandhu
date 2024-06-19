import { initializeApp } from "firebase/app";

import { 
        createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut
        } from 'firebase/auth';

import {
        addDoc, 
        collection, 
        getFirestore
       } from 'firebase/firestore';

import { getStorage } from "firebase/storage";

import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDry3BLRnZv3s1yWpy8cC3FU_-qiFxzRbs",
  authDomain: "olx-by-anandhu.firebaseapp.com",
  projectId: "olx-by-anandhu",
  storageBucket: "olx-by-anandhu.appspot.com",
  messagingSenderId: "458362817696",
  appId: "1:458362817696:web:b64d06aa4afa2b2b4d8dc5"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const signup = async (name , email , password)=>{

    try{

       const res = await createUserWithEmailAndPassword(auth,email,password)
       const user = res.user;
       await addDoc(collection(db , "user"),{

             uid:user.uid,
             name,
             authProvider:'local',
             email,
       })
       
    }catch(err){
        console.log("Error wile storing data in FireBase", err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email , password)=>{

    try{
      await signInWithEmailAndPassword(auth, email, password)
    }catch(err){
       console.log(err);
       toast.error(err.code.split('/')[1].split('-').join(' '));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth , db , storage, login, signup , logout }