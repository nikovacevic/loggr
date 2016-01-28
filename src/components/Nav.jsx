import React from 'react';
import {doNothing, goNowhere} from '../core/utils';
import {goTo} from '../core/router';

const Nav = React.createClass({
  propTypes: {
    currentPath: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    return nextProps.currentPath !== this.props.currentPath;
  },

  render: function() {
    let {items, currentPath} = this.props;
    return (
      <nav>
        <div className="nav-wrapper blue-grey darken-3">
          <div className="container">
            <a className="brand-logo center" href="#!">{'Loggr'}</a>
            <ul className="left hide-on-med-and-down">
              {items.map(navItem => {
                let isActive = currentPath === navItem.path;
                return (
                  <li className={isActive ? 'active' : null} key={navItem.path}>
                    <a
                      href={goNowhere}
                      onClick={isActive ? doNothing : goTo(navItem.path)}
                    >{navItem.text}</a>
                  </li>
                );
              })}
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <a
                  href="https://github.com/jtribble/loggr"
                  target="_blank"
                ><i className="material-icons">{'code'}</i></a>
              </li>
              <li>
                <a
                  href="https://github.com/jtribble/loggr/issues"
                  target="_blank"
                ><i className="material-icons">{'report_problem'}</i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

export default Nav;
