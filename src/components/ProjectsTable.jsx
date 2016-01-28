import React from 'react';
import ConfirmModal from './ConfirmModal';
import InlineProjectForm from './InlineProjectForm';

const ProjectsTable = React.createClass({
  displayName: 'ProjectsTable',
  propTypes: {
    onDeleteProject: React.PropTypes.func.isRequired,
    onUpdateProject: React.PropTypes.func.isRequired,
    projects: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      projectInEditMode: null,
      projectToDelete: null
    };
  },

  handleCancelClick: function() {
    this.setState({
      projectInEditMode: null
    });
  },

  handleDeleteClick: function(oldProject) {
    if (!this.$deleteProjectModal) {
      this.$deleteProjectModal = $(this.deleteProjectModal.ref());
    }
    this.setState({projectToDelete: oldProject});
    this.$deleteProjectModal.openModal();
  },

  handleDeleteProject: function(e) {
    e.preventDefault();
    if (this.state.projectToDelete) {
      this.props.onDeleteProject(this.state.projectToDelete);
    } else {
      console.error('Could not find project object to delete in state.');
    }
  },

  handleEditClick: function(projectToEdit) {
    this.setState({
      projectInEditMode: projectToEdit
    });
  },

  handleUpdateProject: function(newValues) {
    this.props.onUpdateProject(this.state.projectInEditMode.id, newValues);
  },

  render: function() {
    return (
      <div className="section section--padded">
        <h5>{'#recent'}</h5>
        <div className="divider"></div>
        <table className="highlight">
          <tbody>
            {this.props.projects.map(project => {
              let isEditing = this.state.projectInEditMode === project;
              return (
                <InlineProjectForm
                  isEditing={isEditing}
                  key={project.id}
                  onCancel={this.handleCancelClick}
                  onDeleteProject={this.handleDeleteClick}
                  onEditProject={this.handleEditClick}
                  onUpdateProject={this.handleUpdateProject}
                  project={project}
                />
              );
            })}
          </tbody>
        </table>
        <ConfirmModal
          message={`Are you sure you want to delete this project?
            This action cannot be undone.`}
          onModalConfirm={this.handleDeleteProject}
          ref={ref => this.deleteProjectModal = ref}
        />
      </div>
    );
  }
});

export default ProjectsTable;
