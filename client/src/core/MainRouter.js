import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails'
import PrivateRoute from '../components/PrivateRoute'

export default function MainRouter() {
    return (
        <Fragment>
            <Menu>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <PrivateRoute exact path='/dashboard' component={Home} />
                    <PrivateRoute exact path='/dashboard/projects' component={Projects} />
                    <PrivateRoute exact path='/dashboard/projects/project-details/:title' component={ProjectDetails} />
                </Switch>
            </Menu>
        </Fragment>
    )
}