import {combineReducers} from 'redux-immutablejs';
import logs from './logs';
import projectColors from './project_colors';
import projects from './projects';
import user from './user';

const reducer = combineReducers({
  logs,
  projectColors,
  projects,
  user
});

export default reducer;
