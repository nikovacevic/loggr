import React from 'react';
import Project from '../models/Project';
import {Pie} from 'react-chartjs';

const Toolkit = React.createClass({
  propTypes: {
    logs: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired
  },

  render: function() {
    let todaysProjects = Project.todaysProjects(
      this.props.projects,
      this.props.logs
    );

    return (
      <div className="section section--padded">
        <h5>{'Today at a glance'}</h5>
        <div className="divider"></div>
        <Pie
          data={todaysProjects}
        />
      </div>
    );
  }
});

export default Toolkit;
