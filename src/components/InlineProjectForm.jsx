import React from 'react';
import Project from '../models/Project';
import {goNowhere} from '../core/utils';
import moment from 'moment';

const InlineProjectForm = React.createClass({
  displayName: 'InlineProjectForm',
  propTypes: {
    isEditing: React.PropTypes.bool,
    onCancel: React.PropTypes.func.isRequired,
    onDeleteProject: React.PropTypes.func.isRequired,
    onEditProject: React.PropTypes.func.isRequired,
    onUpdateProject: React.PropTypes.func.isRequired,
    project: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    let project = this.props.project;
    // save values of original log
    this.originalProject = {
      name: project.name
    };
    this.setState(this.originalProject);
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.isEditing && !prevProps.isEditing) {
      this.input.focus();
    }
  },

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.setState(this.originalProject);
  },

  handleDeleteClick: function(e) {
    e.preventDefault();
    this.props.onDeleteProject(this.props.project);
  },

  handleEditClick: function(e) {
    e.preventDefault();
    this.props.onEditProject(this.props.project);
  },

  handleProjectNameKeyUp: function(e) {
    if (e.which === 13) {
      this.setState({
        name: e.target.value
      }, () => this.saveButton.click());
    }
  },

  handleUpdateClick: function(e) {
    e.preventDefault();
    this.props.onUpdateProject({
      name: this.state.name
    });
  },

  render: function() {
    let {isEditing, project} = this.props;
    let tableClasses = 'editable has-color-key';
    if (isEditing) {
      tableClasses += ' is-editing';
    }
    return (
      <tr className={tableClasses} style={{borderColor: project.color.hex}}>
        <td onClick={this.handleEditClick}>
          <input
            className="input"
            onChange={e => this.setState({name: e.target.value})}
            onKeyUp={this.handleProjectNameKeyUp}
            placeholder="Project/Client"
            readOnly={!isEditing}
            ref={ref => this.input = ref}
            type="text"
            value={this.state.name}
          />
        </td>
        <td onClick={this.handleEditClick}>
          <input
            className="input"
            readOnly={true}
            type="text"
            value={Project.getLogCountText(project.logIds.length)}
          />
        </td>
        <td onClick={this.handleEditClick}>
          <input
            className="input"
            readOnly={true}
            type="text"
            value={moment(project.createdAt).fromNow()}
          />
        </td>
        {isEditing ? (
          <td className="row-actions">
            <a
              className="text-hover-blue-grey"
              href={goNowhere}
              onClick={this.handleUpdateClick}
              ref={ref => this.saveButton = ref}
            ><i className="material-icons">{'save'}</i></a>
            <a
              className="text-hover-grey"
              href={goNowhere}
              onClick={this.handleCancelClick}
            ><i className="material-icons">{'cancel'}</i></a>
          </td>
        ) : (
          <td className="row-actions">
            <a
              className="text-hover-teal"
              href={goNowhere}
              onClick={this.handleEditClick}
            ><i className="material-icons">{'edit'}</i></a>
            <a
              className="text-hover-red"
              href={goNowhere}
              onClick={this.handleDeleteClick}
            ><i className="material-icons">{'delete'}</i></a>
          </td>
        )}
      </tr>
    );
  }
});

export default InlineProjectForm;
