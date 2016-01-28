import React from 'react';
import Project from '../models/Project';
import {goNowhere} from '../core/utils';
import moment from 'moment';

const ProjectRow = React.createClass({
  propTypes: {
    onDeleteProject: React.PropTypes.func.isRequired,
    onEditProject: React.PropTypes.func.isRequired,
    project: React.PropTypes.object.isRequired
  },

  handleDeleteClick: function(e) {
    e.preventDefault();
    this.props.onDeleteProject(this.props.project);
  },

  handleEditClick: function(e) {
    e.preventDefault();
    this.props.onEditProject();
  },

  render: function() {
    let {project} = this.props;
    return (
      <tr className="editable">
        <td onClick={this.handleEditClick}>
          <span>
            {project.name}
          </span>
        </td>
        <td onClick={this.handleEditClick}>
          <span>
            {Project.getLogCountText(project.logIds.length)}
          </span>
        </td>
        <td onClick={this.handleEditClick}>
          <span>
            {moment(project.createdAt).fromNow()}
          </span>
        </td>
        <td className="row-actions">
          <a
            href={goNowhere}
            onClick={this.handleDeleteClick}
          ><i className="material-icons">{'delete'}</i></a>
        </td>
      </tr>
    );
  }
});

export default ProjectRow;
