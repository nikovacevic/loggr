//
// Storage.js
//

const storeKey = 'loggr.store';

/**
 * Retrieve the Redux store from localStorage
 *
 * @return {object} - The last saved Redux store
 */
export function loadStore() {
  return JSON.parse(window.localStorage.getItem(storeKey));
}

/**
 * Save the current store to localStorage
 *
 * @param {object} store - The Redux store
 */
export function saveStore(store) {
  window.localStorage.setItem(storeKey, JSON.stringify(store));
}
