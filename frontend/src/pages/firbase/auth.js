import { createUserWithEmailAndPassword ,GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email,password)=>{
     return createUserWithEmailAndPassword(auth,email,password);

}

export const doSignInWithEmailAndPassword = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

export const doSignInWithGoodle = async ()=>{
     const provider = new GoogleAuthProvider();
     const result = await signInWithPopup(auth,provider)
     console.log(result)
     return result
}

export const doSignOut= ()=>{
    return auth.signOut();
}

// export const doPasswordReset = (email)=>{
//     return sendPasswordResetEmail(auth,email);

// }

// export const doPasswordChange = (password)=>{
//     return updatePassword(auth.currentUser,password);
// }

// export const doSendEmailVerification = ()=>{
//      return sendEmailVerfification(auth.currentUser,{
//         url:`${window.location.origin}/home`,
//      })
// }