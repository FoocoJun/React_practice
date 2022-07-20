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
const KEEP = "user/KEEP";
const AWAY = "user/AWAY";
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const DELETE = "post/DELETE";

const initialState = {
  post: [],
  userData: { userName: "", userEmail: "", userPicture: "" },
};

// Action Creators

export function keepUserData(userData) {
  return { type: KEEP, userData };
}
export function awayUserData(userData) {
  return { type: AWAY, userData };
}

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
//로그인 시 로그인 정보 불러와서 로그인 데이타 저장
export const keepUserDataFB = () => {
  return async function (dispatch) {
    try {
      let userData = {};
      userData.userEmail = auth.currentUser.email;
      let userInfo = await getDoc(doc(db, "users", userData.userEmail));

      userData.userName = { ...userInfo.data() }.name;
      userData.userPicture = { ...userInfo.data() }.pic;

      //userData 구성 완료
      dispatch(keepUserData(userData));
    } catch {
    }
  };
};

export const awayUserDataFB = () => {
  return async function (dispatch) {
    let userData = { userName: "", userEmail: "", userPicture: "" };
    //userData 구성 완료
    console.log(userData);
    dispatch(awayUserData(userData));
  };
};

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
    case "user/KEEP": {
      return { post: state.post, userData: action.userData };
    }
    case "user/AWAY": {
      return { post: state.post, userData: action.userData };
    }
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
