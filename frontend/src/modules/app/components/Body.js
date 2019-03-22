import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';

const Body = ({user}) => (

    <div className="container">
        <br/>
        <Route path="/" component={AppGlobalComponents}/>
        <Switch>
            <Route exact path="/" component={Home}/>
            {user && <Route exact path="/users/update-profile" component={UpdateProfile}/>}
            {user && <Route exact path="/users/change-password" component={ChangePassword}/>}
            {user && <Route exact path="/users/logout" component={Logout}/>}
            {!user && <Route exact path="/users/login" component={Login}/>}
            {!user && <Route exact path="/users/signup" component={SignUp}/>}
            <Route component={Home}/>
        </Switch>
    </div>

);

const mapStateToProps = state => ({
    user: users.selectors.getUser(state)
});

/*
 * It is necessary to call withRouter(connect(...)(FindProducts)), since Body
 * must be re-rendered when 'location' changes (among others, withRouter pass
 * 'location' property to the wrapped component).
 */
export default withRouter(connect(mapStateToProps)(Body));
