import initialState from '../store/initial_state';
import Collection from '../models/Collection';
import {fromJS} from 'immutable';

/**
 * This is the initial state for logs
 *
 * @var {object} initialLogsState
 */
const initialLogsState = initialState.get('logs');

/**
 * Create a new log
 *
 * @param {Immutable.Map} state - The current state
 * @param {object} newLog - The new log item
 * @return {Immutable.Map} - The new state
 */
const createLog = (state, newLog) => {
  let newState = state.toJS();
  Collection.add(newState, newLog);
  return fromJS(newState);
};

/**
 * Delete a log
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} oldLogId - The id of the log to delete
 * @return {Immutable.Map} - The new state
 */
const deleteLog = (state, oldLogId) => {
  let newState = state.toJS();
  Collection.remove(newState, oldLogId);
  return fromJS(newState);
};

/**
 * Remove log's projectId relation (called when project is deleted)
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} logId - The id of the log
 * @return {Immutable.Map} - The new state
 */
const unsetLogProject = (state, logId) => {
  let newState = state.toJS();
  let log;
  try {
    log = Collection.find(newState, logId);
    log.projectId = null;
  } catch (ex) {
    console.error(ex);
  }
  return fromJS(newState);
};

/**
 * Update a log
 *
 * @param {Immutable.Map} state - The current state
 * @param {number} logId - The id of the log to update
 * @param {object} newValues - The new values to assign
 * @return {Immutable.Map} - The new state
 */
const updateLog = (state, logId, newValues) => {
  let newState = state.toJS();
  Collection.update(newState, logId, newValues);
  return fromJS(newState);
};

/**
 * The logs reducer
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} - The new state
 */
const logsReducer = (state = initialLogsState, action) => {
  switch (action.type) {
    case 'CREATE_LOG':
      return createLog(state, action.newLog);
    case 'DELETE_LOG':
      return deleteLog(state, action.oldLogId);
    case 'UNSET_LOG_PROJECT':
      return unsetLogProject(state, action.logId);
    case 'UPDATE_LOG':
      return updateLog(state, action.logId, action.newValues);
    default:
      return state;
  }
};

export default logsReducer;
