// posts.js

import { db, storage, auth } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


// Actions
const CHECK = "user/CHECK";
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";

const initialState = {
  isLogin: false,
  post: [],
};

// Action Creators
export function checkLogin(isLogin) {
  return { type: CHECK, isLogin };
}

export function loadPost(postsList) {
  return { type: LOAD, postsList };
}

export function createPost(post) {
  return { type: CREATE, post };
}



//middlewares

export const loadDictFB = () => {
  return async function (dispatch) {
    const mpm_data = await getDocs(collection(db, "posts"));
    let postsList = [];
    mpm_data.forEach((doc) => {
      doc.data();
      postsList.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadPost(postsList));
  };
};

export const createDictFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "posts"), post);
    const new_data = { id: docRef.id, ...post };
    dispatch(createPost(new_data));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "user/CHECK": {
      return { post: [...state.post], is_loaded: action.isLogin };
    }
    case "post/LOAD": {
      return { post: action.postsList, is_loaded: true }; //LOAD가 완료되면 true 반환
    }
    case "post/CREATE": {
      const new_dict_list = [...state.post, action.post];
      return { post: new_dict_list, is_loaded: true };
    }
    // do reducer stuff
    default:
      return state;
  }
}
