import { CLEAR, HISTORY } from '../actionType';

const initialState = {
  history: [],
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY:
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case CLEAR:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};
export default history;
