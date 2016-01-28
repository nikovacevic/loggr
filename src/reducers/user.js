import initialState from '../store/initial_state';

/**
 * This is the initial state for the user
 *
 * @var {object} initialLogsState
 */
const initialUserState = initialState.get('user');

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
