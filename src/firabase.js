// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDzyZ3I_xPJvVj-pBsEh_toFza6QIOrXc0',
  authDomain: 'imput-de-de-imagens.firebaseapp.com',
  projectId: 'imput-de-de-imagens',
  storageBucket: 'imput-de-de-imagens.appspot.com',
  messagingSenderId: '563111803639',
  appId: '1:563111803639:web:8e81b9aee8005b6200b1f2',
  measurementId: 'G-4M96937REK'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
