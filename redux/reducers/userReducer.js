// userReducer.js

import { USER_STATE_CHANGE } from "../constants";

const initialState = {
  currentUser: null, // Inicialize currentUser como null ou com um valor padrão apropriado
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

export default userReducer;