// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnkV6sgTfJhF4MuVc0ZRxsvt1kNG59Iys',
  authDomain: 'tiny-shop-8c1ae.firebaseapp.com',
  projectId: 'tiny-shop-8c1ae',
  storageBucket: 'tiny-shop-8c1ae.appspot.com',
  messagingSenderId: '745842333522',
  appId: '1:745842333522:web:e1f831be4c81a523168c8b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
