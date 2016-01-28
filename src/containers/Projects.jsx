import React from 'react';
import {connect} from 'react-redux';
import Collection from '../models/Collection';
import ProjectForm from '../components/ProjectForm';
import ProjectsTable from '../components/ProjectsTable';
import {createProject, deleteProject, updateProject}
  from '../action_creators/projects';

const Projects = React.createClass({
  displayName: 'ProjectsContainer',
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    projects: React.PropTypes.array.isRequired
  },

  handleCreateProject: function(newProjectName) {
    this.props.dispatch(createProject(newProjectName));
  },

  handleDeleteProject: function(oldProject) {
    this.props.dispatch(deleteProject(oldProject));
  },

  handleUpdateProject: function(projectId, newValues) {
    this.props.dispatch(updateProject(projectId, newValues));
  },

  render: function() {
    let projects = this.props.projects;
    return (
      <div>
        <ProjectForm
          existingProjectNames={projects.map(p => p.name)}
          onCreateProject={this.handleCreateProject}
        />
        <ProjectsTable
          onDeleteProject={this.handleDeleteProject}
          onUpdateProject={this.handleUpdateProject}
          projects={projects}
        />
      </div>
    );
  }
});

/**
 * Which props do we want to inject, given the global state?
 *
 * @param {Immutable.Map} state - The store
 * @return {object} - The store->props map
 */
function mapStateToProps(state) {
  return {
    projects: Collection.listify(state.get('projects').toJS())
  };
}

// wrap component to inject dispatch and state into it
export default connect(mapStateToProps)(Projects);
