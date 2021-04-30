import React, { useState, useEffect, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { logOut, authCheck } from '../apis/auth-api'
import { Context } from '../global/Store'
import { Link, Redirect, useLocation } from 'react-router-dom'
import ListSubheader from '@material-ui/core/ListSubheader'
import SnackBar from '../components/Snackbar'
import HomeIcon from '@material-ui/icons/Home'
import BugReportIcon from '@material-ui/icons/BugReport'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PeopleIcon from '@material-ui/icons/People'
import {CLOSESNACKBAR, LOGIN, LOGOUT} from '../helpers/constants'


const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  landingPage: {
    flexGrow: 1,
  },
}))

const Menu = ({ window, children }) => {

  /**
   * Styling
   */
  const classes = useStyles()
  const theme = useTheme()


  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [redirect, setRedirect] = useState(false)
  const [store, dispatch] = useContext(Context)

  const location = useLocation()
  /**
   * Handles initial check to see if the user has a cookie
   */
  useEffect(() => {
    authCheck().then((res) => {
      const user = res.data.user
      const payload = {
        isLoggedIn: true,
        role: user.role,
        userId: user._id
      }
      dispatch({ type: LOGIN, payload: payload })
    }).catch(e => null)
    // eslint-disable-next-line
  }, [])


  /**
   * Handles the logout function and redirects user to the landing page
   */
  const handleLogOut = () => {
    logOut()
    dispatch({ type: LOGOUT})
    setRedirect(!redirect)
  }

  /**
   * Displays the log in and sign up button in the navbar
   * if the user is not logged in
   */
  const options = (
    !store.isLoggedIn &&
    <React.Fragment>
      <Link to='/login' className={classes.link}><Button color="inherit">Log In</Button></Link>
      {/* <Link to='/signup' className={classes.link}><Button color="inherit">Sign Up</Button></Link> */}
    </React.Fragment>
  )

  /**
   * Opens the drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  /**
   * Navigation options displayed in the drawer when a user is signed in
   */
  const drawerNavOptions = [['Home', '', HomeIcon], ['My tickets', 'tickets', BugReportIcon], ['My Profile', `profile/${store.userId}`, AccountBoxIcon]]
  const adminNavOptions = [['Manage User Roles', 'admin/user-roles', AssignmentIndIcon], ['Manage Project Teams', 'admin/teams', PeopleIcon]]

  if(store.isDemoUser) {
    drawerNavOptions.pop()
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List
        subheader={
          <ListSubheader component="div">
            Navigation
          </ListSubheader>
        }
      >
        {/* Map navigation options to the drawer */}
        {
          drawerNavOptions.map(([label, address, Icon], index) => (
            <Link to={`/dashboard/${address}`} className={classes.link} key={label}>
              <ListItem button >
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))
        }

        <ListItem button onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='LogOut' />
        </ListItem>
      </List>

      {/* Shows admin options if the user is classified as an admin the DB */}
      {
        store.role === 'Admin' &&
        <React.Fragment>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div">
                Admin Options
        </ListSubheader>
            }
          >
            {
              adminNavOptions.map(([label, address, Icon], index) => (
                <Link to={`/dashboard/${address}`} className={classes.link} key={label}>
                  <ListItem button >
                    <ListItemIcon><Icon /></ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                </Link>
              ))
            }
          </List>
        </React.Fragment>
      }
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    /**
     * If the route contains '/dashboard' the drawer will be rendered.
     * Otherwise, the basic nav bar will be rendered.
     */
    location.pathname.includes('/dashboard') ?
    (<div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BugTracker
          </Typography>
          {options}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}

        <SnackBar
          open={store.snackbarIsOpen}
          handleClose={() => dispatch({ type: CLOSESNACKBAR })}
          severity={store.snackbarSeverity}
          text={store.snackbarText}
        />
      </main>
    </div>)
    : (
      <div className={classes.root}>
        {redirect && <Redirect to='/' />}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              BugTracker
          </Typography>

            {options}

          </Toolbar>
        </AppBar>
        <main className={!location.pathname === '/' ? classes.content : classes.landingPage}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )

  )
}

export default Menu
