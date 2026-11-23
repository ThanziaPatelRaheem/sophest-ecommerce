import React from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";

import "./MobileCarousel.css";

const ScrollArrows = ({ onScroll, canScrollLeft = true, canScrollRight = true }) => {
  return (
    <div className="arrow-controls">
      <button type="button" aria-label="Previous card" disabled={!canScrollLeft} className="carousel-arrow left" onClick={() => onScroll("left")}>
        <RiArrowLeftWideFill className="left-aicon" />
      </button>
      <button
        type="button"
        aria-label="Next card"
        disabled={!canScrollRight}
        className="carousel-arrow right-arrow"
        onClick={() => onScroll("right")}
      >
        <RiArrowRightWideFill className="right-aicon" />
      </button>
    </div>
  );
};

export default React.memo(ScrollArrows);
