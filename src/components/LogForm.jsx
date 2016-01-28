import React from 'react';
import DateInput from './DateInput';
import DurationInput from './DurationInput';
import ProjectNameInput from './ProjectNameInput';
import DescInput from './DescInput';
import LogFormMixin from '../mixins/LogFormMixin';
import moment from 'moment';

const LogForm = React.createClass({
  displayName: 'LogForm',
  propTypes: {
    onCreateLog: React.PropTypes.func.isRequired,
    projects: React.PropTypes.array.isRequired
  },
  // pretty much all of the log form functionality is in this mixin
  mixins: [LogFormMixin],

  componentWillMount: function() {
    // this function is part of the LogFormMixin
    this.setStateWithDefaults({
      date: moment().format('YYYY MM DD')
    });
  },

  /**
   * Update state when a date is selected
   *
   * Note: This is a wrapper for handleDateChange in LogFormMixin
   *
   * @param {string} newDate - The new log date
   */
  handleDateChangeOverride: function(newDate) {
    this.handleDateChange(newDate, () => {
      if (!this.state.duration) {
        return this.durationInput.focus();
      }
      if (!this.state.projectName) {
        return this.projectInput.focus();
      }
      this.descInput.focus();
    });
  },

  /**
   * Update state when user clicks an existing project from dropdown
   *
   * Note: This is a wrapper for handleProjectItemClick in LogFormMixin
   *
   * @param {string} newProjectName - The selected project
   */
  handleProjectItemClickOverride: function(newProjectName) {
    this.handleProjectItemClick(newProjectName, () => {
      this.descInput.focus();
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.onCreateLog(this.getLogFromState());
      this.setStateWithDefaults({
        date: moment().format('YYYY MM DD')
      });
      this.durationInput.focus();
    }
    return false;
  },

  render: function() {
    return (
      <div className="section section--padded">
        <h5>{'Log your time'}</h5>
        <div className="divider"></div>
        <form
          autoComplete="off"
          className="row row--fill"
          onSubmit={this.handleSubmit}
          ref={ref => this.logForm = ref}
        >
          <div className="input-field col s1">
            <DurationInput
              autoFocus={true}
              onDurationChange={val => this.setState({duration: val})}
              ref={ref => this.durationInput = ref}
              tabIndex={1}
              value={this.state.duration}
            />
          </div>
          <div className="input-field col s1">
            <DateInput
              onDateChange={this.handleDateChangeOverride}
              ref={ref => this.dateInput = ref}
              tabIndex={5}
              value={this.state.date}
            />
          </div>
          <div className="input-field col s3">
            <ProjectNameInput
              onProjectInputChange={val => this.setState({projectName: val})}
              onProjectInputEnter={() => this.descInput.focus()}
              onProjectItemClick={this.handleProjectItemClickOverride}
              projectNames={this.props.projects.map(project => project.name)}
              ref={ref => this.projectInput = ref}
              tabIndex={2}
              value={this.state.projectName}
            />
          </div>
          <div className="input-field col s6">
            <DescInput
              onDescChange={val => this.setState({desc: val})}
              onDescEnter={this.handleDescEnter}
              ref={ref => this.descInput = ref}
              tabIndex={3}
              value={this.state.desc}
            />
          </div>
          <div className="input-field col s1">
            <a
              className="btn-floating btn-medium waves-effect waves-light"
              onClick={this.handleSubmit}
              ref={ref => this.saveButton = ref}
              tabIndex={4}
            ><i className="material-icons">{'add'}</i></a>
          </div>
        </form>
      </div>
    );
  }
});

export default LogForm;
