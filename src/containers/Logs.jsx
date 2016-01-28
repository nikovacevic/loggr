import React from 'react';
import {connect} from 'react-redux';
import LogForm from '../components/LogForm';
import LogsTable from '../components/LogsTable';
import Collection from '../models/Collection';
import Log from '../models/Log';
import {createLog, deleteLog, updateLog} from '../action_creators/logs';

const Logs = React.createClass({
  displayName: 'LogsContainer',
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    logs: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired
  },

  handleCreateLog: function(newLog) {
    this.props.dispatch(createLog(newLog));
  },

  handleDeleteLog: function(oldLog) {
    this.props.dispatch(deleteLog(oldLog));
  },

  handleUpdateLog: function(logId, newValues) {
    this.props.dispatch(updateLog(logId, newValues));
  },

  render: function() {
    return (
      <div>
        <LogForm
          onCreateLog={this.handleCreateLog}
          projects={Collection.listify(this.props.projects)}
        />
        <LogsTable
          logs={Collection.listify(this.props.logs, 10)}
          onDeleteLog={this.handleDeleteLog}
          onUpdateLog={this.handleUpdateLog}
          projects={this.props.projects}
        />
      </div>
    );
  }
});

/**
 * Which props do we want to inject, given the global state?
 *
 * @param {object} state - The store
 * @return {object} - The store->props map
 */
function mapStateToProps(state) {
  return {
    logs: state.get('logs').toJS(),
    projects: state.get('projects').toJS()
  };
}

// wrap component to inject dispatch and state into it
export default connect(mapStateToProps)(Logs);
