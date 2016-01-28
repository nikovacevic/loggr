import React from 'react';
import ValidationLabel from './ValidationLabel';
import _ from 'lodash';

const initialState = {
  invalidProjectName: false,
  projectName: null
};

const ProjectForm = React.createClass({
  propTypes: {
    existingProjectNames: React.PropTypes.array.isRequired,
    onCreateProject: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return initialState;
  },

  handleChange: function(e) {
    let userInput = e.target.value;
    let existingProjectNames = this.props.existingProjectNames;
    this.setState({
      invalidProjectName: _.some(existingProjectNames, project => {
        return project.toLowerCase() === userInput.toLowerCase();
      }),
      projectName: userInput
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (!this.state.invalidProjectName) {
      this.props.onCreateProject(this.state.projectName);
      this.setState(initialState);
      this.input.focus();
    }
  },

  render: function() {
    let {invalidProjectName, projectName} = this.state;
    let saveButtonClasses = 'btn-floating btn-medium waves-effect waves-light';
    if (this.state.invalidProjectName) {
      saveButtonClasses += ' disabled';
    }
    return (
      <div className="section section--padded">
        <h5>{'Add a project'}</h5>
        <div className="divider"></div>
        <form
          autoComplete="off"
          className="row row--fill"
          onSubmit={this.handleSubmit}
          ref={ref => this.logForm = ref}
        >
          <div className="input-field col s6">
            <input
              autoFocus={true}
              className={(invalidProjectName) ? 'invalid' : null}
              onChange={this.handleChange}
              placeholder="Project/Client"
              ref={ref => this.input = ref}
              type="text"
              value={projectName}
            />
            <ValidationLabel errorMsg="project already exists" />
          </div>
          <div className="input-field col s1">
            <a
              className={saveButtonClasses}
              disabled={invalidProjectName}
              onClick={this.handleSubmit}
              ref={ref => this.saveButton = ref}
            ><i className="material-icons">{'add'}</i></a>
          </div>
        </form>
      </div>
    );
  }
});

export default ProjectForm;
