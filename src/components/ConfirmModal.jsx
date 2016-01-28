import React from 'react';
import {doNothing, goNowhere} from '../core/utils';

const ConfirmModal = React.createClass({
  propTypes: {
    header: React.PropTypes.string,
    message: React.PropTypes.string,
    onModalConfirm: React.PropTypes.func.isRequired,
    onModalExit: React.PropTypes.func
  },

  ref: function() {
    return this.modal;
  },

  render: function() {
    return (
      <div className="modal" ref={ref => this.modal = ref}>
        <div className="modal-content">
          <h4>{this.props.header || 'Check Yo Self'}</h4>
          <p>{this.props.message || 'Are you sure you want to do this?'}</p>
        </div>
        <div className="modal-footer">
          <a
            className="modal-action modal-close waves-effect waves-red btn-flat"
            href={goNowhere}
            onClick={doNothing}
          >{'Nevermind'}</a>
          <a
            className="modal-action modal-close waves-effect waves-green btn-flat" // eslint-disable-line max-len
            href={goNowhere}
            onClick={this.props.onModalConfirm}
          >{'I\'m sure'}</a>
        </div>
      </div>
    );
  }
});

export default ConfirmModal;
