import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './Menu'
import PrivateRoute from '../components/PrivateRoute'


const LandingPage = lazy(() => import('../pages/LandingPage'))
const Login = lazy(() => import('../pages/Login'))
// const SignUp = lazy(() => import('../pages/Signup'))
const Home = lazy(() => import('../pages/Home'))
const TicketDetails = lazy(() => import('../pages/TicketDetails'))
const AdminTeams = lazy(() => import('../pages/AdminTeams'))
const AdminRoles = lazy(() => import('../pages/AdminRoles'))
// const Profile = lazy(() => import('../pages/Profile'))
const UserTickets = lazy(() => import('../pages/UserTickets'))
const NotFound = lazy(() => import('../pages/NotFound'))

const MainRouter = () => {
    return (
        <Menu>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/login' component={Login} />
                    {/* <Route exact path='/signup' component={SignUp} /> */}
                    <PrivateRoute exact path='/dashboard/tickets/' component={UserTickets} />
                    {/* <PrivateRoute exact path='/dashboard/profile/:userId' component={Profile} /> */}
                    <PrivateRoute exact path='/dashboard' component={Home} />
                    <PrivateRoute exact path='/dashboard/projects/ticket/:ticketId' component={TicketDetails} />
                    <PrivateRoute exact path='/dashboard/admin/teams' component={AdminTeams} />
                    <PrivateRoute exact path='/dashboard/admin/user-roles' component={AdminRoles} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Menu>
    )
}

export default MainRouter