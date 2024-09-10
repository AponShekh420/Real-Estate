"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const PriceRange = ({price, setPrice, currentPrice}) => {

  // Handle slider value change
  const handleOnChange = (value) => {
    setPrice(value); // Update the parent state
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          max={1000000000}
          min={0}
          defaultValue={currentPrice}
          value={price}
          onChange={handleOnChange}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">${price[0]}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">${price[1]}</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
