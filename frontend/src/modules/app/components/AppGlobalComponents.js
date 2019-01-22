import React from 'react';
import {connect} from 'react-redux';

import {ErrorDialog, Loader} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors'

const AppGlobalComponents = (props) => (

    <div>
        <ErrorDialog error={props.error} 
            handleClose={props.handleCloseErrorDialog}/>
        <Loader loading={props.loading}/>
    </div>

);

const mapStateToProps = (state, ownProps) => ({
    error: selectors.getError(state),
    loading: selectors.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
    handleCloseErrorDialog() {
        dispatch(actions.error(null))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppGlobalComponents);
