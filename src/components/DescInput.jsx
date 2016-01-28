import React from 'react';

const DescInput = React.createClass({
  propTypes: {
    onDescChange: React.PropTypes.func.isRequired,
    onDescEnter: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    value: React.PropTypes.string
  },

  focus: function() {
    this.input.focus();
  },

  handleKeyUp: function(e) {
    if (e.which === 13) {
      this.props.onDescEnter();
    }
  },

  render: function() {
    let value = (this.props.value) ? this.props.value : '';
    return (
      <input
        className="input input--s5"
        onChange={e => this.props.onDescChange(e.target.value)}
        onKeyUp={this.handleKeyUp}
        placeholder="What did you work on?"
        readOnly={this.props.readOnly}
        ref={ref => this.input = ref}
        tabIndex={this.props.tabIndex}
        type="text"
        value={value}
      />
    );
  }
});

export default DescInput;
