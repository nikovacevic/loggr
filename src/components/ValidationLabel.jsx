import React from 'react';

const ValidationLabel = ({errorMsg, successMsg}) => {
  return (
    <label
      className="label--invisible"
      data-error={errorMsg}
      data-success={successMsg}
    >{'Invisible label with long title'}</label>
  );
};

export default ValidationLabel;
