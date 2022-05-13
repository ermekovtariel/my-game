import { CLEAR, HISTORY } from '../actionType';

export const makeHistroryAction = (changedAction) => async (dispatch) => {
  dispatch({
    type: HISTORY,
    payload: changedAction,
  });
};

export const clearHistoryAction = () => async (dispatch) => {
  dispatch({
    type: CLEAR,
  });
};
