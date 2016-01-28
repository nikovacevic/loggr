import React from 'react';
import DateInput from './DateInput';
import DurationInput from './DurationInput';
import ProjectNameInput from './ProjectNameInput';
import DescInput from './DescInput';
import LogFormMixin from '../mixins/LogFormMixin';
import {goNowhere} from '../core/utils';
import _ from 'lodash';

const InlineLogForm = React.createClass({
  displayName: 'InlineLogForm',
  propTypes: {
    isEditing: React.PropTypes.bool,
    log: React.PropTypes.object.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onDeleteLog: React.PropTypes.func.isRequired,
    onEditLog: React.PropTypes.func.isRequired,
    onUpdateLog: React.PropTypes.func.isRequired,
    project: React.PropTypes.object,
    projects: React.PropTypes.array.isRequired,
    tabIndexBase: React.PropTypes.number.isRequired
  },
  // pretty much all of the log form functionality is in this mixin
  mixins: [LogFormMixin],

  componentWillMount: function() {
    this.setOriginalLog(this.props.log, this.props.project.name);
  },

  componentWillReceiveProps: function(nextProps) {
    if (!_.isEqual(nextProps.log, this.props.log)) {
      this.setOriginalLog(nextProps.log, nextProps.project.name);
    }
  },

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.setStateWithDefaults(this.originalLog);
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
      this.saveButton.click();
    });
  },

  handleDeleteClick: function(e) {
    e.preventDefault();
    this.props.onDeleteLog(this.props.log);
  },

  handleEditClick: function(e) {
    e.preventDefault();
    this.props.onEditLog(this.props.log);
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
      this.saveButton.click();
    });
  },

  handleUpdateClick: function(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.onUpdateLog(this.props.log.id, this.getLogFromState());
      this.props.onCancel();
    }
  },

  setOriginalLog: function(log, projectName) {
    // save values of original log
    this.originalLog = {
      date: log.date,
      duration: log.duration,
      projectName: projectName,
      desc: log.desc
    };
    // this function is part of the LogFormMixin
    this.setStateWithDefaults(this.originalLog);
  },

  render: function() {
    let {isEditing, project, tabIndexBase} = this.props;
    let rowClasses = 'editable has-color-key';
    if (isEditing) {
      rowClasses += ' is-editing';
    }
    return (
      <tr className={rowClasses} style={{borderColor: project.color.hex}}>
        <td onClick={this.handleEditClick}>
          <DurationInput
            onDurationChange={this.handleDurationChange}
            onDurationEnter={this.handleDurationEnter}
            readOnly={!isEditing}
            ref={ref => this.durationInput = ref}
            tabIndex={tabIndexBase + 1}
            value={this.state.duration}
          />
        </td>
        <td onClick={this.handleEditClick}>
          <DateInput
            onDateChange={this.handleDateChangeOverride}
            readOnly={!isEditing}
            ref={ref => this.dateInput = ref}
            tabIndex={tabIndexBase + 5}
            value={this.state.date}
          />
        </td>
        <td onClick={this.handleEditClick}>
          <ProjectNameInput
            onProjectInputChange={val => this.setState({projectName: val})}
            onProjectInputEnter={() => this.saveButton.click()}
            onProjectItemClick={this.handleProjectItemClickOverride}
            projectNames={this.props.projects.map(project => project.name)}
            readOnly={!isEditing}
            ref={ref => this.projectNameInput = ref}
            tabIndex={tabIndexBase + 2}
            value={this.state.projectName}
          />
        </td>
        <td className="stretch" onClick={this.handleEditClick}>
          <DescInput
            onDescChange={val => this.setState({desc: val})}
            onDescEnter={this.handleDescEnter}
            readOnly={!isEditing}
            ref={ref => this.descInput = ref}
            tabIndex={tabIndexBase + 3}
            value={this.state.desc}
          />
        </td>
        {isEditing ? (
          <td className="row-actions">
            <a
              className="text-hover-blue-grey"
              href={goNowhere}
              onClick={this.handleUpdateClick}
              ref={ref => this.saveButton = ref}
              tabIndex={tabIndexBase + 4}
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

export default InlineLogForm;
