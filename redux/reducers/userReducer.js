

import { USER_STATE_CHANGE, DATA_USER_CHANGE } from "../constants";


const initialState = {
  currentUser: null, 
  currentData: null,
  abast: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
      case DATA_USER_CHANGE:
      return {
        ...state,
        currentData: action.currentData,
      };
    default:
      return state;
  }
};

export default userReducer;