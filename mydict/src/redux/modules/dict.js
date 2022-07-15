// dict.js
import { db } from "../../firebase";
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
const LOAD = "dict/LOAD";
const CREATE = "dict/CREATE";
const UPDATE = "dict/UPDATE";
const REMOVE = "dict/REMOVE";

const initialState = {
  is_loaded: false, //LOAD 완료 전 false
  dict: [],
};

// Action Creators
export function loadDict(mpm_dict) {
  return { type: LOAD, mpm_dict };
}

export function createDict(dict) {
  return { type: CREATE, dict };
}
//업데이트와 제거 미완성
export function updateDict(dict) {
  return { type: UPDATE, dict };
}

export function removeDict(dict) {
  return { type: REMOVE, dict };
}

//Middlewares
//loadDictFB라는 함수를 이용해 액션이 일어나기 전 셋팅을 가능하도록 함.
//이 경우 action이 reducer에 도달하기 전에 FB에 접근하여 정보를 가져옴.
export const loadDictFB = () => {
  return async function (dispatch) {
    const mpm_data = await getDocs(collection(db, "mpm_words"));
    let mpm_dict = [];
    mpm_data.forEach((doc) => {
      doc.data();
      mpm_dict.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadDict(mpm_dict));
  };
};
//비동기 통신에서 async 함수의 경우 서버의 실행계획 여부를 promise로 반환함
//promise! 처리할게! 하지만 언제 할지는 모르겠어.
//이때 await을 사용하면 됨.
//await이 표시된 줄이 완료가 될때까지 기다리며 완료된 후 다음 단계로 넘어감.
//await이 없을 시 promise만 제공되고 mpm_data가 없어서 이후 오류가 뜰 가능성이 있음.

export const createDictFB = (dict) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "mpm_words"), dict);
    const new_data = { id: docRef.id, ...dict };
    dispatch(createDict(new_data));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "dict/LOAD": {
      return { dict: action.mpm_dict, is_loaded: true }; //LOAD가 완료되면 true 반환
    }
    case "dict/CREATE": {
      const new_dict_list = [...state.dict, action.dict];
      return { dict: new_dict_list, is_loaded: true };
    }
    case "dict/UPDATE": {
      const new_dict_list = [...state.dict, action.dict];
      return { dict: new_dict_list };
    }
    case "dict/REMOVE": {
      const new_dict_list = [...state.dict, action.dict];
      return { dict: new_dict_list };
    }

    // do reducer stuff
    default:
      return state;
  }
}
