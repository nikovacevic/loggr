import React from 'react';
import {goNowhere} from '../core/utils';
import _ from 'lodash';

const PredictiveText = React.createClass({
  displayName: 'PredictiveText',
  propTypes: {
    dropdownItems: React.PropTypes.array.isRequired,
    onInputChange: React.PropTypes.func.isRequired,
    onInputEnter: React.PropTypes.func,
    onItemClick: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    value: React.PropTypes.string
  },

  componentDidMount: function() {
    this.setDropdownRef();
  },

  focus: function() {
    this.input.focus();
  },

  handleBlur: function(e) {
    e.stopPropagation();
    this.$dropdownList.fadeOut();
  },

  handleFocus: function(e) {
    e.stopPropagation();
    this.$dropdownList.fadeIn();
  },

  handleItemClick: function(e) {
    e.preventDefault();
    this.props.onItemClick(e.target.textContent);
  },

  handleKeyUp: function(e) {
    if (e.which === 13) {
      this.$dropdownList.fadeOut();
      this.props.onInputEnter();
    }
  },

  setDropdownRef: function() {
    this.$dropdownList = $(this.dropdownList);
  },

  render: function() {
    let dropdownItems = this.props.dropdownItems;
    if (this.props.value) {
      dropdownItems = dropdownItems.filter(item => {
        return _.includes(item.toLowerCase(), this.props.value.toLowerCase());
      });
    }
    return (
      <div className="predictive-text">
        <input
          className="input input--s3"
          onBlur={this.handleBlur}
          onChange={e => this.props.onInputChange(e.target.value)}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyUp}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref={ref => this.input = ref}
          tabIndex={this.props.tabIndex}
          type="text"
          value={this.props.value}
        />
        <ul
          className="dropdown-content"
          ref={ref => this.dropdownList = ref}
        >
          {dropdownItems.length > 0 ?
            dropdownItems.map(item => (
              <li key={item}>
                <a href={goNowhere} onClick={this.handleItemClick}>
                  {item}
                </a>
              </li>
            )) :
              <li>
                <span>{'New Project'}</span>
              </li>
            }
        </ul>
      </div>
    );
  }
});

export default PredictiveText;
