import React from 'react';
import {connect} from 'react-redux';

const Reports = React.createClass({
  displayName: 'ReportsContainer',
  propTypes: {
    user: React.PropTypes.shape({
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      username: React.PropTypes.string
    })
  },

  render: function() {
    return <p>{`Reports, ${this.props.user.firstName}.`}</p>;
  }
});

/**
 * Which props do we want to inject, given the global state?
 *
 * @param {Immutable.Map} state - The store
 * @return {object} - The store->props map
 */
function mapStateToProps(state) {
  return {
    user: state.get('user').toJS()
  };
}

// wrap component to inject dispatch and state into it
export default connect(mapStateToProps)(Reports);
