// posts.js

import { db,storage } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const imagesRef = ref(storage, 'images');