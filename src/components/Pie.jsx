import React from 'react';
import PieSlice from './PieSlice';

const Pie = ({slices}) => {
  let currentDegree = 0;

  return (
    <div className="pie">
      {slices.map(slice => {
        let sliceSize = slice.percent * 360;
        let sliceStartDegree = currentDegree;
        currentDegree += sliceSize;
        return (
          <PieSlice
            color={slice.sliceColor}
            key={slice.id}
            size={sliceSize}
            startDegree={sliceStartDegree}
          />
        );
      })}
    </div>
  );
};

export default Pie;
