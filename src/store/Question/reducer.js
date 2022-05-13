import {
  FETCH_QUESTION,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_ERROR,
} from '../actionType';

const initialState = {
  questions: [],
  player: { true: 0, false: 0, count: 0, change: false },
  status: 'INITIAL',
};

const question = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return {
        ...state,
        status: 'LOADING',
      };

    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        status: 'SUCCESS',
      };
    case 'CLEAR':
      return {
        ...state,
        questions: [],
        status: 'INITIAL',
      };

    case FETCH_QUESTION_ERROR:
      return {
        ...state,
        status: 'ERROR',
      };

    default:
      return state;
  }
};
export default question;
