import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './screens/home';
import Login from './screens/login';
import Map from './screens/map';
import Profile from "./screens/profile";

class Routes extends React.Component{
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='Home' component={Home} title='Home' hideNavBar={true} />
                    <Scene key='Login' component={Login} title='Login' initial={true} hideNavBar={true} />
                    <Scene key='Map' component={Map} title='Map' hideNavBar={true} />
                    <Scene key='Profile' component={Profile} hideNavBar={true} />
                </Scene>
            </Router>
        )
    }
}

export default Routes;

