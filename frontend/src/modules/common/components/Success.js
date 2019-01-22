import React from 'react';
import PropTypes from 'prop-types';

const Success = ({message, handleClose}) => message && (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" 
            onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

Success.propTypes = {
    message: PropTypes.string,
    handleClose: PropTypes.func.isRequired
};

export default Success;