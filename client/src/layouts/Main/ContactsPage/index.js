import React from 'react';
import {Map, Marker, ZoomControl} from "pigeon-maps";
import {useWindowDimensions} from "../../../hooks";


const ContactsPage = () => {
    const {breakpoint} = useWindowDimensions();

    if (breakpoint === "sm") {
        return (
            <div style={{height: "100vh", width: "100%", paddingTop: 90, backgroundColor: "#fff"}}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    paddingBottom: 120,
                    width: "100%",
                }}>
                    <div style={{
                        display: "flex",
                        padding: "20px 30px",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        width: 400
                    }}>
                        <div style={{fontSize: 26, color: "#2f2f2f"}}>+7 925 517-95-95</div>
                        <div style={{fontSize: 26, color: "#2f2f2f"}}>+7 926 262-82-82</div>

                        <div style={{fontSize: 20, color: "#2f2f2f"}}>Варшавское шоссе 170г</div>
                        <div>Москва, Россия, 117519</div>
                    </div>
                    <Map defaultCenter={[55.609632579556724, 37.606029540569075]} defaultZoom={17}>
                        <ZoomControl/>
                        <Marker width={50} anchor={[55.609632579556724, 37.606029540569075]}/>
                    </Map>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{width: "100%", paddingTop: 120,}}>
                <div style={{
                    display: "flex",
                    height: "85vh",
                    // paddingBottom: 90,
                    width: "100%",
                    backgroundColor: "#fff"
                }}>
                    <div style={{
                        display: "flex",
                        padding: "20px 30px",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        width: 400
                    }}><div style={{fontSize: 26, color: "#2f2f2f"}}>+7 925 517-95-95</div>
                        <div style={{fontSize: 26, color: "#2f2f2f"}}>+7 926 262-82-82</div>

                        <div style={{fontSize: 20, color: "#2f2f2f"}}>Варшавское шоссе 170г</div>
                        <div>Москва, Россия, 117519</div>
                    </div>
                    <Map defaultCenter={[55.609632579556724, 37.606029540569075]} defaultZoom={17}>
                        <ZoomControl/>
                        <Marker width={50} anchor={[55.609632579556724, 37.606029540569075]}/>
                    </Map>
                </div>
            </div>
        );
    }
}

export default ContactsPage;
