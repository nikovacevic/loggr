import React from 'react';
import {formatTimeStr, humanTimeStr} from '../core/time';

const DurationInput = React.createClass({
  displayName: 'DurationInput',
  propTypes: {
    autoFocus: React.PropTypes.bool,
    onDurationChange: React.PropTypes.func.isRequired,
    onDurationEnter: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    value: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },

  focus: function() {
    this.input.focus();
  },

  handleBlur: function(e) {
    if (!this.props.readOnly && e.target.value) {
      // no need to set state, new props will do that for us
      this.props.onDurationChange(formatTimeStr(e.target.value));
    }
  },

  handleChange: function(e) {
    if (!this.props.readOnly) {
      this.setState({
        value: e.target.value.replace(/[^\d.:]/g, '')
      });
    }
  },

  handleKeyUp: function(e) {
    if (e.which === 13) {
      this.props.onDurationChange(formatTimeStr(e.target.value), () => {
        this.props.onDurationEnter();
      });
    }
  },

  render: function() {
    let {autoFocus, readOnly, tabIndex} = this.props;
    let value = this.state.value;
    return (
      <input
        autoFocus={autoFocus}
        className="input input--s1"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        placeholder="Time"
        readOnly={readOnly}
        ref={ref => this.input = ref}
        tabIndex={tabIndex}
        type="text"
        value={readOnly ? humanTimeStr(value) : value}
      />
    );
  }
});

export default DurationInput;
