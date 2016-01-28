import React from 'react';
import PredictiveText from './PredictiveText';

const ProjectNameInput = React.createClass({
  propTypes: {
    onProjectInputChange: React.PropTypes.func.isRequired,
    onProjectInputEnter: React.PropTypes.func.isRequired,
    onProjectItemClick: React.PropTypes.func.isRequired,
    projectNames: React.PropTypes.array,
    readOnly: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    value: React.PropTypes.string
  },

  focus: function() {
    this.predictiveTextInput.focus();
  },

  render: function() {
    return (
      <PredictiveText
        dropdownItems={this.props.projectNames.sort()}
        key={this.props.tabIndex}
        onInputChange={this.props.onProjectInputChange}
        onInputEnter={this.props.onProjectInputEnter}
        onItemClick={this.props.onProjectItemClick}
        placeholder="Project/Client"
        readOnly={this.props.readOnly}
        ref={ref => this.predictiveTextInput = ref}
        tabIndex={this.props.tabIndex}
        value={this.props.value}
      />
    );
  }
});

export default ProjectNameInput;
