import axios from 'axios';

export const FETCH_RETURNED_DEBITS = 'fetch_returned_debits';

export function fetchReturnedDebits() {
  const request = axios.get(`/returneddebits`);

  return {
    type: FETCH_RETURNED_DEBITS,
    payload: request
  };
}