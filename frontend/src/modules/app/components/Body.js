import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/" component={Home}/>
                {loggedIn && <Route exact path="/users/update-profile" component={UpdateProfile}/>}
                {loggedIn && <Route exact path="/users/change-password" component={ChangePassword}/>}
                {loggedIn && <Route exact path="/users/logout" component={Logout}/>}
                {!loggedIn && <Route exact path="/users/login" component={Login}/>}
                {!loggedIn && <Route exact path="/users/signup" component={SignUp}/>}
                <Route component={Home}/>
            </Switch>
        </div>

    );

};

export default Body;
