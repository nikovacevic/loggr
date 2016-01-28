import React from 'react';
import {connect} from 'react-redux';
import Collection from '../models/Collection';
import Nav from '../components/Nav';
import Toolkit from '../components/Toolkit';
import {navItems} from '../settings/nav';

const App = React.createClass({
  displayName: 'AppContainer',
  propTypes: {
    children: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    logs: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired,
    user: React.PropTypes.shape({
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      username: React.PropTypes.string
    })
  },

  render: function() {
    let {children, logs, projects} = this.props;
    return (
      <div>
        <Nav currentPath={this.props.location.pathname} items={navItems} />
        <div className="row" style={{marginBottom: '0'}}>
          <div className="col s3">
            <p>testing</p>
            {/*<Toolkit
              logs={logs}
              projects={projects}
            />*/}
          </div>
          <div className="col s9">
            {children}
          </div>
        </div>
      </div>
    );
  }
});

/**
 * Which props do we want to inject, given the global state?
 *
 * @param {object} state - The store
 * @return {object} - The store->props map
 */
function mapStateToProps(state) {
  return {
    logs: state.get('logs').toJS(),
    projects: state.get('projects').toJS(),
    user: state.get('user').toJS()
  };
}

// wrap component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
