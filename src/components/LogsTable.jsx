import React from 'react';
import Collection from '../models/Collection';
import ConfirmModal from './ConfirmModal';
import InlineLogForm from './InlineLogForm';

const LogsTable = React.createClass({
  displayName: 'LogsTable',
  propTypes: {
    logs: React.PropTypes.array.isRequired,
    onDeleteLog: React.PropTypes.func.isRequired,
    onUpdateLog: React.PropTypes.func.isRequired,
    projects: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      logInEditMode: null,
      logToDelete: null
    };
  },

  handleCancelClick: function() {
    this.setState({
      logInEditMode: null
    });
  },

  handleDeleteClick: function(oldLog) {
    if (!this.$deleteLogModal) {
      this.$deleteLogModal = $(this.deleteLogModal.ref());
    }
    this.setState({logToDelete: oldLog});
    this.$deleteLogModal.openModal();
  },

  handleDeleteLog: function(e) {
    e.preventDefault();
    if (this.state.logToDelete) {
      this.props.onDeleteLog(this.state.logToDelete);
    } else {
      console.error('Could not find log object to delete in state.');
    }
  },

  handleEditClick: function(logToEdit) {
    this.setState({
      logInEditMode: logToEdit
    });
  },

  handleUpdateLog: function(logId, newValues) {
    this.props.onUpdateLog(logId, newValues);
  },

  render: function() {
    let {logs, projects} = this.props;
    return (
      <div className="section section--padded">
        <h5>{'#recent'}</h5>
        <div className="divider"></div>
        <table className="highlight">
          <tbody>
            {logs.map(log => {
              let isEditing = this.state.logInEditMode === log;
              let project = Collection.find(projects, log.projectId);
              let tabIndexBase = log.id * 10;
              return (
                <InlineLogForm
                  isEditing={isEditing}
                  key={log.id}
                  log={log}
                  onCancel={this.handleCancelClick}
                  onDeleteLog={this.handleDeleteClick}
                  onEditLog={this.handleEditClick}
                  onUpdateLog={this.handleUpdateLog}
                  project={project}
                  projects={Collection.listify(projects)}
                  tabIndexBase={tabIndexBase}
                />
              );
            })}
          </tbody>
        </table>
        <ConfirmModal
          message={`Are you sure you want to delete this log?
            This action cannot be undone.`}
          onModalConfirm={this.handleDeleteLog}
          ref={ref => this.deleteLogModal = ref}
        />
      </div>
    );
  }
});

export default LogsTable;
