import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp, useMessage} from "../hooks";
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";


export const AuthPage = () => {



    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#0551A8',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
                 className='col'>
                <img src={`/assets/ultra-icon.png`} className='ultra-icon'/>
                <div style={{fontSize: '8vw', fontWeight: 600, color: '#fff', marginTop: 20}}>Coming SOON !</div>
            </div>

            <Link to={'/haklahana'}>
                <img src={`/assets/ultrafix-logo.png`} className='ultrafix-logo'/>
            </Link>
        </div>
    );
}
