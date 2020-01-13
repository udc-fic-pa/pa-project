import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import users from '../../users';

const Logout = ({history}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(users.actions.logout());
        history.push('/');
    });

    return null;

}

export default Logout;