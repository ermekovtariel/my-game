import axios from 'axios';
import {
  FETCH_QUESTION,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_ERROR,
  CLEAR,
} from '../actionType';

import { notification } from 'antd';
import { urls } from '../../config';

const openNotificationSuccess = (type) => {
  notification[type]({
    message: 'SUCCESS',
  });
};
const openNotificationError = (type) => {
  notification[type]({
    message: 'ERROR',
  });
};

export const getItems = (changedAction) => async (dispatch) => {
  !changedAction &&
    dispatch({
      type: FETCH_QUESTION,
    });

  !changedAction &&
    (await axios
      .get(`${urls.CLUES}`)
      .then((res) => {
        if (!changedAction) {
          dispatch({
            type: FETCH_QUESTION_SUCCESS,
            payload: res.data,
          });
        }
        return res.data;
      })
      .catch((error) => {
        dispatch({
          type: FETCH_QUESTION_ERROR,
        });
        console.error(error);
      }));
};

export const handleAnswer = (data, answ) => async () => {
  if (data.answer === answ) {
    data.value = 'success';
    openNotificationSuccess('success');
  } else {
    data.value = 'error';
    openNotificationError('error');
  }

  localStorage.setItem('change', JSON.stringify(true));
};

export const clearData = () => async (dispatch) => {
  dispatch({ type: CLEAR });
};
