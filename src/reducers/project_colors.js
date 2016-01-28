import initialState from '../store/initial_state';
import {fromJS} from 'immutable';

/**
 * This is the initial state for projects
 *
 * @var {object} initialProjectColorsState
 */
const initialProjectColorsState = initialState.get('projectColors');

/**
 * Use a project color (remove from unused list and add to used list)
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} projectColorIndex - The index of the color to move
 * @return {Immutable.Map} - The new state
 */
const useProjectColor = (state, projectColorIndex) => {
  let newState = state.toJS();
  let projectColor = newState.unused[projectColorIndex].shift();
  // if this is the first time this project color is being
  // used, initialize the array
  if (newState.used[projectColorIndex] === undefined) {
    newState.used[projectColorIndex] = [];
  }
  newState.used[projectColorIndex].unshift(projectColor);
  newState.nextColorIndex = (newState.nextColorIndex + 1) %
    newState.unused.length;
  return fromJS(newState);
};

/**
 * Unuse a project color (remove from used list and add to unused list)
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} projectColorIndex - The index of the color to move
 * @param {string} projectColorHex - The hex of the color to move
 * @return {Immutable.Map} - The new state
 */
const unuseProjectColor = (state, projectColorIndex, projectColorHex) => {
  let newState = state.toJS();
  for (let i = 0; i < newState.used[projectColorIndex].length; i++) {
    if (newState.used[projectColorIndex][i] === projectColorHex) {
      let projectColor = newState.used[projectColorIndex].splice(
        projectColorIndex, 1
      );
      newState.unused[projectColorIndex].unshift(projectColor);
      break;
    }
  }
  return fromJS(newState);
};

/**
 * The projects reducer
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} - The new state
 */
const projectColorsReducer = (state = initialProjectColorsState, action) => { // eslint-disable-line max-len
  switch (action.type) {
    case 'USE_PROJECT_COLOR':
      return useProjectColor(state, action.projectColorIndex);
    case 'UNUSE_PROJECT_COLOR':
      return unuseProjectColor(state, action.projectColorIndex);
    default:
      return state;
  }
};

export default projectColorsReducer;
