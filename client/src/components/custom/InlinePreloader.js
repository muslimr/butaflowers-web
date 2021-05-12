import React from 'react';
import './styles/InlinePreloader.scss';


const InlinePreloader = () => {
    return(
        <div className='container'>
            <div className='loader'>
                <div className='loader--dot'/>
                <div className='loader--dot'/>
                <div className='loader--dot'/>
            </div>
        </div>
    );
}

export default InlinePreloader;
