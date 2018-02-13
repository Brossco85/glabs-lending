import { combineReducers } from 'redux';
import ReturnedDebitsReducer from './reducerReturnedDebits';

const rootReducer = combineReducers({
  returnedDebits: ReturnedDebitsReducer
});


export default rootReducer;