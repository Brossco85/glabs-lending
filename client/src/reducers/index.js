import { combineReducers } from 'redux';
import ReturnedDebitsReducer from './reducerReturnedDebits';

const rootReducer = combineReducers({
  returnedDebits: ReturnedDebitsReducere
});



export default rootReducer;