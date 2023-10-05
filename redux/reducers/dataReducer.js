// dataReducer.js
import { DATA_USER_CHANGE } from '../constants';

const initialState = {
  abast: [], // Inicialize abast como uma matriz vazia
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_USER_CHANGE:
      return {
        ...state,
        abast: action.abast, // Atualize abast com os novos dados
      };
    default:
      return state;
  }
};

export default dataReducer;