import Collection from '../models/Collection';
import {unsetLogProject} from './logs';
import {useProjectColor} from './project_colors';
import moment from 'moment';

/**
 * Add log to project
 *
 * @param {number} projectId - The id of the project
 * @param {number} logId - The id of the log
 * @return {object} - Action object
 */
export function addLogToProject(projectId, logId) {
  return {
    type: 'ADD_LOG_TO_PROJECT',
    projectId,
    logId
  };
}

/**
 * Create a new project
 *
 * @param {object} projectName - The name of the project to create
 * @return {function} - Thunk action
 */
export function createProject(projectName) {
  const _createProject = newProject => {
    return {
      type: 'CREATE_PROJECT',
      newProject
    };
  };
  return function createProjectThunk(dispatch, getState) {
    // format new project object, grabbing project color
    // and adding some additional properties
    let projects = getState().get('projects').toJS();
    let projectColor = dispatch(useProjectColor());
    let newProject = {
      color: projectColor,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ssZ'),
      id: Collection.nextId(projects),
      logIds: [],
      name: projectName
    };
    // save the project
    dispatch(_createProject(newProject));
    return newProject;
  };
}

/**
 * Delete a project
 *
 * @param {object} oldProject - The project to delete
 * @return {function} - Thunk action
 */
export function deleteProject(oldProject) {
  const _deleteProject = oldProjectId => {
    return {
      type: 'DELETE_PROJECT',
      oldProjectId
    };
  };
  return function deleteProjectThunk(dispatch) {
    for (let i = 0; i < oldProject.logIds.length; i++) {
      dispatch(unsetLogProject(oldProject.logIds[i]));
    }
    dispatch(_deleteProject(oldProject.id));
  };
}

/**
 * Find a project, or create it if it does not exist
 *
 * @param {string} projectName - The name of the project to find/create
 * @return {function} - Thunk action
 */
export function findOrCreateProject(projectName) {
  return (dispatch, getState) => {
    // find or create project
    let projects = getState().toJS().projects;
    let project;
    try {
      project = Collection.findByProp(projects, 'name', projectName);
    } catch (ex) {
      project = dispatch(createProject(projectName));
    }
    // now that we have the project, return its id
    return project.id;
  };
}

/**
 * Remove log from project
 *
 * @param {number} projectId - The id of the project
 * @param {number} logId - The id of the log
 * @return {object} - Action object
 */
export function removeLogFromProject(projectId, logId) {
  return {
    type: 'REMOVE_LOG_FROM_PROJECT',
    projectId,
    logId
  };
}

/**
 * Update a project's name
 *
 * @param {number} projectId - The id of the project to update
 * @param {object} newValues - The new values to assign
 * @return {object} - Action object
 */
export function updateProject(projectId, newValues) {
  return {
    type: 'UPDATE_PROJECT',
    projectId,
    newValues
  };
}
