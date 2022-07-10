// dict.js

// Actions
const CREATE = "dict/CREATE";
const UPDATE = "dict/UPDATE";
const REMOVE = "dict/REMOVE";

const initialState = {
  dict: [
    {
      word: "ABORT",
      def: "Directive call to cease action, attack, event, or mission.",
      ex: "COCA 1, ABORT",
      num: 0,
    },
  ],
};

// Action Creators
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수를 제공
  switch (action.type) {
    case "dict/CREATE": {
      const new_dict_list = [...state.dict, action.dict];
      return { dict: new_dict_list };
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
