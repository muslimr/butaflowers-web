import React from 'react';


const InlineLoader = props => {
    //  styles
    let {style, circleColor} = props;

    return(
        <div className='loader-container' style={style}>
            <div className='loader-circle' style={{backgroundColor: circleColor}}/>
            <div className='loader-circle' style={{backgroundColor: circleColor}}/>
            <div className='loader-circle' style={{backgroundColor: circleColor}}/>
        </div>
    );
}

export default InlineLoader;
