import _ from 'lodash';
import { FETCH_RETURNED_DEBITS } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_RETURNED_DEBITS:
    return _.mapKeys(action.payload.data.returnedDebits, '_id');
    default:
    return state;
  }
}