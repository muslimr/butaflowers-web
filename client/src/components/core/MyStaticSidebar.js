import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link, useHistory, useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function MyStaticSidebar(props) {
    let {pageRoutes} = props;
    const classes = useStyles();

    let history = useHistory();
    let location = useLocation();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/adminPanel')
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                {
                    location.pathname.split('/')[1] === 'adminPanel' &&
                    <ListItem button onClick={(e) => logoutHandler(e)}>
                        <ListItemText primary={'Выйти'}/>
                    </ListItem>
                }
                <Divider />
                <List>
                    {
                        pageRoutes.map((page, index) =>
                            <Link key={index} to={page.route} className={classes.link}>
                                <ListItem button>
                                    <ListItemText primary={page.label} />
                                </ListItem>
                            </Link>
                        )
                    }
                </List>
            </Drawer>
        </div>
    );
}
