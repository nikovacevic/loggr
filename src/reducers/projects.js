import initialState from '../store/initial_state';
import Collection from '../models/Collection';
import {fromJS} from 'immutable';

/**
 * This is the initial state for projects
 *
 * @var {object} initialProjectsState
 */
const initialProjectsState = initialState.get('projects');

/**
 * Add log to project
 *
 * Note: if we've made it to this point, then we've
 * verified that the project and log both exist
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} projectId - The id of the project
 * @param {number} logId - The id of the log
 * @return {Immutable.Map} - The new state
 */
const addLogToProject = (state, projectId, logId) => {
  let newState = state.toJS();
  let project = Collection.find(newState, projectId);
  project.logIds.unshift(logId);
  return fromJS(newState);
};

/**
 * Create a new project
 *
 * @param {Immutable.Map} state - The current state
 * @param {object} newProject - The new project item
 * @return {Immutable.Map} - The new state
 */
const createProject = (state, newProject) => {
  let newState = state.toJS();
  Collection.add(newState, newProject);
  return fromJS(newState);
};

/**
 * Delete a project
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} oldProjectId - The id of the project to delete
 * @return {Immutable.Map} - The new state
 */
const deleteProject = (state, oldProjectId) => {
  let newState = state.toJS();
  Collection.remove(newState, oldProjectId);
  return fromJS(newState);
};

/**
 * Remove log from project
 *
 * Note: if we've made it to this point, then we've
 * verified that the project and log both exist
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} projectId - The id of the project
 * @param {number} projectLogIndex - The index of the log to remove
 * @return {Immutable.Map} - The new state
 */
const removeLogFromProject = (state, projectId, projectLogIndex) => {
  let newState = state.toJS();
  let project = Collection.find(newState, projectId);
  project.logIds.splice(projectLogIndex, 1);
  return fromJS(newState);
};

/**
 * Update a project's name
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} projectId - The id of the project to update
 * @param {object} newValues - The new values to assign
 * @return {Immutable.Map} - The new state
 */
const updateProject = (state, projectId, newValues) => {
  let newState = state.toJS();
  Collection.update(newState, projectId, newValues);
  return fromJS(newState);
};

/**
 * The projects reducer
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} - The new state
 */
const projectsReducer = (state = initialProjectsState, action) => {
  switch (action.type) {
    case 'ADD_LOG_TO_PROJECT':
      return addLogToProject(state, action.projectId, action.logId);
    case 'CREATE_PROJECT':
      return createProject(state, action.newProject);
    case 'DELETE_PROJECT':
      return deleteProject(state, action.oldProjectId);
    case 'REMOVE_LOG_FROM_PROJECT':
      return removeLogFromProject(
        state,
        action.projectId,
        action.projectLogIndex
      );
    case 'UPDATE_PROJECT':
      return updateProject(state, action.projectId, action.newValues);
    default:
      return state;
  }
};

export default projectsReducer;
