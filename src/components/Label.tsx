"use client";

import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ content, size, bold }) => {
  const labelStyles = {
    fontSize: size,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return <span style={labelStyles}>{content}</span>;
};

Label.propTypes = {
  content: PropTypes.string.isRequired,
  size: PropTypes.string,
  bold: PropTypes.bool,
};

Label.defaultProps = {
  size: 'inherit',
  bold: false,
};

export default Label;
