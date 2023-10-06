// dataReducer.js
import { DATA_USER_CHANGE } from '../constants';

const initialState = {
  abast: [], 
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_USER_CHANGE:
      return {
        ...state,
        abast: action.abast, 
      };
    default:
      return state;
  }
};

export default dataReducer;