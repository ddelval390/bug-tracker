import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute'
import TicketDetails from '../pages/TicketDetails'
import AdminTeams from '../pages/AdminTeams'
import AdminRoles from '../pages/AdminRoles'
import Profile from '../pages/Profile'
import UserTickets from '../pages/UserTickets'

const MainRouter = () => {
    return (
        <Fragment>
            <Menu>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <PrivateRoute exact path='/dashboard/tickets/' component={UserTickets} />
                    <PrivateRoute exact path='/dashboard/profile/:userId' component={Profile} />
                    <PrivateRoute exact path='/dashboard' component={Home} />
                    <PrivateRoute exact path='/dashboard/projects/ticket/:ticketId' component={TicketDetails} />
                    <PrivateRoute exact path='/dashboard/admin/teams' component={AdminTeams} />
                    <PrivateRoute exact path='/dashboard/admin/user-roles' component={AdminRoles} />
                </Switch>
            </Menu>
        </Fragment>
    )
}

export default MainRouter