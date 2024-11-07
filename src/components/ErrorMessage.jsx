import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
    error ? <p className="text-red-500">{error}</p> : null
);

ErrorMessage.propTypes = {
    error: PropTypes.string,
};

export default ErrorMessage;
