import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import users from '../../users';

const reauthenticationCallback = dispatch => () => 
    dispatch(users.actions.logout());

class App extends React.Component {

    componentDidMount() {
  
        this.props.dispatch(
            users.actions.tryLoginFromServiceToken(
                reauthenticationCallback(this.props.dispatch)));

    }

    render() {

        return (
            <Router>
                <div>
                    <Header/>
                    <Body/>
                    <Footer/>
                </div>
            </Router>
        );

    }

}

export default connect()(App);