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

const initialState = {
  userData: { userName: "", userEmail: "", userPicture: "" },
};

// Action Creators

export function keepUserData(userData) {
  return { type: KEEP, userData };
}
export function awayUserData(userData) {
  return { type: AWAY, userData };
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
    } catch {}
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "user/KEEP": {
      return { userData: action.userData };
    }
    case "user/AWAY": {
      return { userData: action.userData };
    }
    // do reducer stuff
    default:
      return state;
  }
}
