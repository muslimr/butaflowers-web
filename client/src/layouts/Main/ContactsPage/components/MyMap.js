import React, { Component } from 'react';
import { Map, Marker, ZoomControl } from "pigeon-maps";


export default function MyMap() {
    return (
        <Map height={300} defaultCenter={[40.409904, 49.943341]} defaultZoom={17}>
            <ZoomControl />
            <Marker width={50} anchor={[40.409904, 49.943341]}/>
        </Map>
    );
}
