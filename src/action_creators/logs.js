import Collection from '../models/Collection';
import {addLogToProject, findOrCreateProject, removeLogFromProject}
  from './projects';
import moment from 'moment';

/**
 * Create a new log
 *
 * @param {object} newLog - The new log entry
 * @return {function} - Thunk action
 */
export function createLog(newLog) {
  const _createLog = newLog => {
    return {
      type: 'CREATE_LOG',
      newLog
    };
  };
  return (dispatch, getState) => {
    // figure out the project id (either find or create)
    newLog.projectId = dispatch(findOrCreateProject(newLog.projectName));
    delete newLog.projectName;
    // modify the log
    let logs = getState().toJS().logs;
    newLog.createdAt = moment().format();
    newLog.id = Collection.nextId(logs);
    // save the log
    dispatch(_createLog(newLog));
    dispatch(addLogToProject(newLog.projectId, newLog.id));
  };
}

/**
 * Delete a log
 *
 * @param {object} oldLog - The log to delete
 * @return {function} - Thunk action
 */
export function deleteLog(oldLog) {
  const _deleteLog = oldLogId => {
    return {
      type: 'DELETE_LOG',
      oldLogId
    };
  };
  return dispatch => {
    if (oldLog.projectId) {
      dispatch(removeLogFromProject(oldLog.projectId, oldLog.id));
    }
    dispatch(_deleteLog(oldLog.id));
  };
}

/**
 * Remove log's projectId relation (called when project is deleted)
 *
 * @param {number} logId - The id of the log
 * @return {object} - The action object
 */
export function unsetLogProject(logId) {
  return {
    type: 'UNSET_LOG_PROJECT',
    logId
  };
}

/**
 * Update a log
 *
 * @param {number} logId - The id of the log to update
 * @param {object} newValues - The new values to assign
 * @return {object} - The action object
 */
export function updateLog(logId, newValues) {
  const _updateLog = (logId, newValues) => {
    return {
      type: 'UPDATE_LOG',
      logId,
      newValues
    };
  };
  return (dispatch, getState) => {
    // get existing log from collection
    let logs = getState().toJS().logs;
    let log = Collection.find(logs, logId);
    // figure out the project id (either find or create)
    let oldProjectId = log.projectId;
    newValues.projectId = dispatch(findOrCreateProject(newValues.projectName));
    delete newValues.projectName;
    // if necessary, update project->log relations
    if (newValues.projectId !== oldProjectId) {
      dispatch(removeLogFromProject(oldProjectId, logId));
      dispatch(addLogToProject(newValues.projectId, logId));
    }
    dispatch(_updateLog(logId, newValues));
  };
}
