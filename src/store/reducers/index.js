import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers for other parts of the state
});

export default rootReducer;