import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";

const Cell = ({ handleCellClick, id }) => {
  return <div id={id} className="cell" onClick={handleCellClick}></div>;
};

Cell.propTypes = {
  handleCellClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Cell;
