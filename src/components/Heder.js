import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import 'firebase/auth';
import 'firebase/firestore';
import Inbox from './Inbox';
import AuthContainer from '../reducers/authReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const Header = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleMenu = (event) => {
    setDrawer(true);
  };
  const handleClose = () => {
    setDrawer(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            onClick={handleMenu}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            ハロ！つべ
          </Typography>
          {/* <Auth /> */}
          {/* <NavigationItem /> */}
          <AuthContainer />
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={handleClose}>
        <List>
          <div onClick={handleClose}>
            <ListItem button to="/" component={Link}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
            <Divider />
            <ListItem button to="/members/add" component={Link}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="推し追" />
            </ListItem>
            <ListItem button to="/members/edit" component={Link}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="推し変" />
            </ListItem>
          </div>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="推したち" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div onClick={handleClose}>
              <List component="div" disablePadding>
                {/* {renderList} */}
                <Inbox nested={classes.nested} />
              </List>
            </div>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
