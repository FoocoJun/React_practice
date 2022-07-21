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
  setDoc,
} from "firebase/firestore";

// Actions
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const DELETE = "post/DELETE";
const COMMENT = "post/COMMENT";

const initialState = {
  post: [],
  isUpdated: 0,
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

export function commentPost(a) {
  return { type: DELETE, a };
}

//middlewares
export const loadPostFB = () => {
  return async function (dispatch) {
    const postData = await getDocs(collection(db, "posts"));
    let postsList = [];
    postData.forEach((post) => {
      post.data();
      postsList.push({ id: post.id, ...post.data() });
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
    postData.forEach((post) => {
      post.data();
      postsList.push({ id: post.id, ...post.data() });
    });
    postsList.sort((a, b) => (a.date > b.date ? -1 : 1));
    dispatch(loadPost(postsList));
  };
};

export const commentPostFB = (commentCard) => {
  return async function (dispatch) {
    const docRef = doc(db, "posts", commentCard.postId);
    let tmp = await getDoc(docRef);
    let tmpPost = tmp.data()
    if (!tmpPost.comments) {
      tmpPost.comments=[{...commentCard}]
    }
    else {
      tmpPost.comments.splice(0,0,{...commentCard})
    }
    console.log(tmpPost)
    await setDoc(docRef,tmpPost)

    addDoc(collection(db,"users/"+commentCard.userEmail+"/comments"),commentCard)
    //코맨트에 넣어둠.

    dispatch(commentPost(1))
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "post/LOAD": {
      return {
        post: action.postsList,
      };
    }
    case "post/CREATE": {
      const newPostList = [action.post, ...state.post];
      let newUpdated = state.isUpdated +1
      return { post: newPostList, isUpdated: newUpdated };
    }
    case "post/DLETEE": {
      let newUpdated = state.isUpdated +1
      return { post: action.postsList, isUpdated: newUpdated};
    }
    case "post/COMMENT": {
      let newUpdated = state.isUpdated +1
      return { post: action.postsList, isUpdated: newUpdated };
    }
    
    // do reducer stuff
    default:
      return state;
  }
}
