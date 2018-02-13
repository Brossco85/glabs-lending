import axios from 'axios';

export const FETCH_RETURNED_DEBITS = 'fetch_returned_debits';

// const ROOT_URL = 'http://localhost:3001';

export function fetchReturnedDebits() {
  const request = axios.get(`/returneddebits`);

  return {
    type: FETCH_RETURNED_DEBITS,
    payload: request
  };
}