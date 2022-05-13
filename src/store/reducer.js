import { combineReducers } from 'redux';

import auth from './Auth/reducer';
import question from './Question/reducer';
import history from './GameHystory/reducer';

const rootReducer = combineReducers({
  auth,
  question,
  history,
});

export default rootReducer;
