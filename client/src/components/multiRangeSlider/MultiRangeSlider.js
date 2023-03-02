import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.scss";

const MultiRangeSlider = ({ min, max, minVal, maxVal, setMinVal, setMaxVal }) => {
  let minValRef = (minVal);
  let maxValRef = (maxVal);
  // console.log(minValRef, maxValRef);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),[min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="range-container">
      <input
        type="range"
        min={min}
        max={max}
        step="0.5"
        value={minVal}
        onChange={event => {
          const value = Math.min(Number(event.target.value), maxVal);
          console.log(value);
          setMinVal(value);
          minValRef = value;
        }}
        className="range-thumb range-thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step="0.5"
        value={maxVal}
        onChange={event => {
          const value = Math.max(Number(event.target.value), minVal);
          console.log(value);
          setMaxVal(value);
          maxValRef = value;
        }}
        className="range-thumb range-thumb--right"
      />

      <div className="range-slider">
        <div className="range-slider__track" />
        <div ref={range} className="range-slider__range" />
        <div className="range-slider__left-value">{minVal}</div>
        <div className="range-slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default MultiRangeSlider;
