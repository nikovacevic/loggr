import {createHistory} from 'history';

//
// Router.js
//

export const history = createHistory();

/**
 * Go to a new route
 *
 * @param {string} path - The path to transition to
 * @return {function} - The thunk function to transition the route
 */
export const goTo = path => {
  return e => {
    e.preventDefault();
    history.replaceState(null, path);
  };
};
