import { AUTH, SCORE_PLUS, SCORE_MINUS, SCORE_TO_ZERO } from '../actionType';

const initialState = {
  auth: '',
  score: 0,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case SCORE_PLUS:
      return {
        ...state,
        score: state.score + action.payload,
      };
    case SCORE_MINUS:
      return {
        ...state,
        score: state.score - action.payload,
      };
    case SCORE_TO_ZERO:
      return {
        ...state,
        score: 0,
      };

    default:
      return state;
  }
};
export default auth;
