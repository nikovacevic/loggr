import Collection from './Collection';
import Log from './Log';
import {timeStrToDec} from '../core/time';
import _ from 'lodash';

//
// Project.js
//

const Project = {

  /**
   * Given the number of logs, return text describing the quantity
   *
   * @param {number} logCount - The number of logs
   * @return {string} - The log count string
   */
  getLogCountText(logCount = 0) {
    if (logCount === 0) {
      return 'No log entries';
    }
    if (logCount === 1) {
      return '1 log entry';
    }
    return logCount.toString() + ' log entries';
  },

  /**
   * Given a projectId (may be null), return project name
   *
   * @param {object} c - The projects collection
   * @param {number} projectId - The log's project id
   * @return {string} - The project name text
   */
  getNameById(c, projectId) {
    if (projectId) {
      try {
        let project = Collection.find(c, projectId);
        return project.name;
      } catch (ex) {
        console.error(ex);
      }
    }
    return 'Missing project';
  },

  /**
   * Given today's logs, retreive today's projects
   *
   * @param {object} c - The projects collection
   * @param {object} logs - The logs collection
   * @return {array} - Today's project summary
   */
  todaysProjects(c, logs) {
    let todaysLogs = Log.todaysLogs(logs);
    return todaysLogs.reduce((acc, curr) => {
      let project = _.find(acc, {id: curr.projectId});
      if (!project) {
        try {
          let projRecord = Collection.find(c, curr.projectId);
          project = {
            color: projRecord.color.hex,
            highlight: projRecord.color.hex,
            id: curr.projectId,
            label: projRecord.name,
            value: 0
          };
          acc.push(project);
        } catch (ex) {
          console.error(ex);
        }
      }
      project.value += curr.duration;
      return acc;
    }, []);
  }

};

export default Project;
