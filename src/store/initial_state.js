import Collection from '../models/Collection';
import projectColors from '../settings/project_colors';
import {loadStore} from '../core/storage';
import {fromJS} from 'immutable';

// the initial state for a first-time user
let initialState = fromJS({
  logs: Collection.create(),
  projectColors,
  projects: Collection.create(),
  user: {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe'
  }
});

// the store loaded from localStorage
let userStore = loadStore();

// if the user has data, load it
if (userStore) {
  initialState = initialState.merge(fromJS(userStore));
}

export default initialState;
