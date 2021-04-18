import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { logOut, cookieCheck } from '../apis/auth-api';
import { Context } from '../global/Store';
import { Link, Redirect, useLocation } from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';

const drawerWidth = 240;

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
}));

function ResponsiveDrawer({ window, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [redirect, setRedirect] = useState(false)
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    cookieCheck().then((res) => {
      const user = res.data.user
      const payload = {
        isLoggedIn: true,
        role: user.role,
        userId: user._id
      }
      dispatch({ type: 'LOGIN', payload: payload })
    }).catch(e => null)
    // eslint-disable-next-line
  }, [])


  const handleLogOut = () => {
    logOut()
    dispatch({ type: 'LOGOUT', payload: false })
    setRedirect(!redirect)
  }

  const options = (
    state.isLoggedIn ?
      <React.Fragment>
        <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
      </React.Fragment>
      :
      <React.Fragment>
        <Link to='/login' className={classes.link}><Button color="inherit">Log In</Button></Link>
        <Link to='/signup' className={classes.link}><Button color="inherit">Sign Up</Button></Link>
      </React.Fragment>
  )


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerNavOptions = [['Home', ''], ['My Projects', 'projects'], ['My tickets', 'tickets'], ['My Profile', 'profile']]

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
        {drawerNavOptions.map(([label, address], index) => (
          <Link to={`/dashboard/${address}`} className={classes.link} key={label}>
            <ListItem button >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Shows admin options if the user is classified as an admin the DB */}
      {
        state.role === 'Admin' &&
        <React.Fragment>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div">
                Admin Options
        </ListSubheader>
            }
          >
            {['Manage Role Assigments', 'Manage Users'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      }



    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (location.pathname.includes('/dashboard') ?
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )

  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
