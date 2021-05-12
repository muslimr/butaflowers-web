import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            display: 'flex',
        },
    },
}));

export default function MyInput(props) {
    let {label, value, containerStyle, onChange} = props;
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off" style={containerStyle}>
            <TextField label={label}
                       value={value}
                       id="outlined-basic"
                       variant="outlined"
                       onChange={onChange}
            />
        </form>
    );
}