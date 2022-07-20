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
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const DELETE = "post/DELETE";

const initialState = {
  post: [],
};

// Action Creators

export function loadPost(postsList) {
  return { type: LOAD, postsList };
}

export function createPost(post) {
  return { type: CREATE, post };
}

export function deletePost(post) {
  return { type: DELETE, post };
}

//middlewares
export const loadPostFB = () => {
  return async function (dispatch) {
    const postData = await getDocs(collection(db, "posts"));
    let postsList = [];
    postData.forEach((doc) => {
      doc.data();
      postsList.push({ id: doc.id, ...doc.data() });
    });
    postsList.sort((a, b) => (a.date > b.date ? -1 : 1));
    dispatch(loadPost(postsList));
  };
};

export const createPostFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "posts"), post);
    const new_data = { id: docRef.id, ...post };
    dispatch(createPost(new_data));
  };
};

export const deletePostFB = (Params) => {
  return async function (dispatch) {
    const docRef = doc(db, "posts", Params.postId);
    await deleteDoc(docRef);

    const postData = await getDocs(collection(db, "posts"));
    let postsList = [];
    postData.forEach((doc) => {
      doc.data();
      postsList.push({ id: doc.id, ...doc.data() });
    });
    postsList.sort((a, b) => (a.date > b.date ? -1 : 1));
    dispatch(loadPost(postsList));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "post/LOAD": {
      return {
        post: action.postsList,
        userData: state.userData,
      };
    }
    case "post/CREATE": {
      const newPostList = [action.post, ...state.post];
      return { post: newPostList, userData: state.userData };
    }
    case "post/DLETEE": {
      return { post: action.postsList, userData: state.userData };
    }
    // do reducer stuff
    default:
      return state;
  }
}
