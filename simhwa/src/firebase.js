// Import the functions you need from the SDKs you need

//firebase 앱 실행하기
import { initializeApp } from "firebase/app";

//firebase.js
//파이어 스토어 (문자 데이터베이스)
import { getFirestore } from "firebase/firestore";
//파이어 스토리지 (대용량 데이터베이스)
import { getStorage } from "firebase/storage";
//파이어 얻흐 (인증정보 서비스)
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//프로젝트 정보
const firebaseConfig = {
  apiKey: "AIzaSyBN7eTmB_9lJTpP1d2E3ct8_8aEgcDKdp8",
  authDomain: "simhwa-babee.firebaseapp.com",
  projectId: "simhwa-babee",
  storageBucket: "simhwa-babee.appspot.com",
  messagingSenderId: "871896845705",
  appId: "1:871896845705:web:7d977ce38f56a15c732558",
  measurementId: "G-H4RDHVPGWF",
};

// Initialize Firebase
//파이어베이스 시작해서 프로젝트 app 정보 받아오기
const app = initializeApp(firebaseConfig);

//app 프로젝트의 파이어베이스 가져오기
const db = getFirestore(app);
//app 프로젝트의 스토리지 가져오기
const storage = getStorage(app);
//app 프로젝트의 인증정보 가져오기
const auth = getAuth();

export { db, storage, auth };
