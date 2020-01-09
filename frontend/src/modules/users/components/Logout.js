import {useEffect} from 'react';
import {connect} from 'react-redux';

import users from '../../users';

const Logout = ({dispatch, history}) => {

    useEffect(() => {
        dispatch(users.actions.logout());
        history.push('/');
    });

    return null;

}

export default connect()(Logout);