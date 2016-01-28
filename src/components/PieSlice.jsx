import React from 'react';

const PieSlice = ({color, size, startDegree}) => {
  let sliceClass = 'pie-slice';
  if (size > 180) {
    sliceClass += ' pie-slice--majority';
  }
  return (
    <div
      className={sliceClass}
      style={{
        transform: `rotate(${startDegree}deg)`
      }}
    >
      <div
        className="pie-slice-contents"
        style={{
          backgroundColor: color,
          transform: `rotate(${size}deg)`
        }}
      ></div>
      {size > 90 ? (
        <div
          className="pie-slice-contents"
          style={{
            backgroundColor: color
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default PieSlice;
