import React from 'react';
import Log from '../models/Log';
import {doNothing} from '../core/utils';

const DateInput = React.createClass({
  propTypes: {
    onDateChange: React.PropTypes.func.isRequired,
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

  initDatepicker: function() {
    // attach datepicker event
    this.$input = $(this.input);
    this.$input.pickadate({
      format: 'yyyy mm dd',
      onSet: changes => {
        if (!changes.hasOwnProperty('select')) {
          // the user changed month or year, so do nothing
          return;
        }
        this.props.onDateChange(this.input.value);
      },
      selectMonths: true,
      selectYears: 3
    });
    this.$datePicker = this.$input.pickadate('picker');
  },

  handleDateClick: function(e) {
    e.preventDefault();
    if (!this.$datePicker) {
      this.initDatepicker();
    }
    this.$datePicker.open();
  },

  render: function() {
    return (
      <input
        className="input input--date input--s2"
        data-value={this.props.value}
        onChange={doNothing}
        onClick={this.handleDateClick}
        placeholder="Date"
        readOnly={this.props.readOnly}
        ref={ref => this.input = ref}
        tabIndex={this.props.tabIndex}
        type="text"
        value={Log.formatDate(this.state.value)}
      />
    );
  }
});

export default DateInput;
