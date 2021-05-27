import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Input, InputLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            display: 'flex',
        },
    },
}));

export default function MyInput(props) {
    let {
        label,
        value,
        multiline,
        containerStyle,
        onChange,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root} style={containerStyle}>
            <InputLabel htmlFor="standard-input">{label}</InputLabel>
            <Input id="standard-input"
                   multiline={multiline}
                   value={value}
                   onChange={onChange}
            />
        </div>
    );
}
