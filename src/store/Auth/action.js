import { AUTH, SCORE_PLUS, SCORE_MINUS, SCORE_TO_ZERO } from '../actionType';

export const authAction = (name) => async (dispatch) => {
  dispatch({
    type: AUTH,
    payload: name,
  });
};
export const scorePlus = (value) => async (dispatch) => {
  dispatch({
    type: SCORE_PLUS,
    payload: value,
  });
};
export const scoreMinus = (value) => async (dispatch) => {
  dispatch({
    type: SCORE_MINUS,
    payload: value,
  });
};
export const scoreToZero = () => async (dispatch) => {
  dispatch({
    type: SCORE_TO_ZERO,
  });
};
