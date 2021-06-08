import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";


const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#39BBA9',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(18),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#000'
    },
    padding: {
        padding: theme.spacing(1),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    demo2: {
        // display: "flex",
        marginTop: 40,
        padding: theme.spacing(2),
        // backgroundColor: '#2e1534',
    },
}));


export default function MyNavbar(props) {
    let {pageRoutes} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        for (let index in pageRoutes) {
            if (pageRoutes[index].route === history.location.pathname) {
                setValue(parseInt(index));
            }
        }
    }, []);


    return (
        <div className={classes.root}>
            <img src={`/assets/logo_westflora.svg`} style={{marginRight: 100, marginTop: 20, marginBottom: 20, width: 200}}/>

            <div className={classes.demo2}>
                {/*<Typography className={classes.padding} />*/}
                {/*<div className='d-flex justify-content-end'>*/}
                {/*    <div className='nums-box ml-5' style={{position: 'absolute'}}>*/}
                {/*        <div className='mr-4'>8 (926) 262 82 82</div>*/}
                {/*        <div className='ml-4'>8 (495) 517 95 95</div>*/}
                {/*    </div>*/}
                {/*</div>*/}



                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example right">
                    {
                        pageRoutes.map((page, index) =>
                            <StyledTab key={index} label={page.label} onClick={() => history.push(page.route)}/>
                        )
                    }
                </StyledTabs>
            </div>
        </div>
    );
}
