import React from 'react';

import classNames from "classnames";


const DividerLine = (props) => {

    let { className, style, color } = props;

    const st = {
        vertical: {width: 1, backgroundColor: color ? color : '#ececec', ...style},
        horizontal: {maxHeight: 1, backgroundColor: color ? color : '#ececec', ...style},
    }


    if (props.type === 'vertical') {
        return <div className={classNames(`h-100 ${!!className && className}`)} style={st.vertical}/>;
    } else {
        return <div className={classNames(`col ${!!className && className}`)} style={st.horizontal}/>;
    }
};

export default DividerLine;


