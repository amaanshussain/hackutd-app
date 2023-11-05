import { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react';
import { Box, Slider, Typography } from "@mui/material";
import { CalculateMidPointByCoordinates } from '../js/js';

const Marker = ({ color }) => <div style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: color, borderWidth: 2, borderColor: "#000" }} />;

const sensors = [
    { lat: 40.595561, lng: -105.14055 },
    { lat: 40.596108, lng: -105.140583 },
    { lat: 40.595556, lng: -105.140069 },
    { lat: 40.596114, lng: -105.140075 },
    { lat: 40.596108, lng: -105.140583 },
    { lat: 40.595556, lng: -105.140069 },
    { lat: 40.595561, lng: -105.14055 },
    { lat: 40.596114, lng: -105.140075 },
    { lat: 40.595658, lng: -105.139869 },
    { lat: 40.595725, lng: -105.140008 },
    { lat: 40.595881, lng: -105.139686 },
    { lat: 40.595947, lng: -105.139833 },
    { lat: 40.595658, lng: -105.139869 },
    { lat: 40.595725, lng: -105.140008 },
    { lat: 40.595881, lng: -105.139686 },
    { lat: 40.595947, lng: -105.139833 },
    { lat: 40.595542, lng: -105.139211 },
    { lat: 40.595547, lng: -105.139714 },
    { lat: 40.596089, lng: -105.139144 },
    { lat: 40.596097, lng: -105.139678 },
]

export default function Map({ data, alerts }) {

    const [time, setTime] = useState(0);
    const [activeHeatMap, setActiveHeatMap] = useState([]);



    useEffect(() => {

        if (Object.keys(data).length === 0) {
            return;
        }

        const temp = [];
        alerts.forEach(item => {
            const cTime = Number(Object.keys(data)[time]);
            console.log(item.Start, cTime, item.End)
            if (item.Start < cTime) {
                temp.push({ lat: item.Longitude, lng: item.Latitude }) // were flipped from dataframe
            }
        })

        setActiveHeatMap([...temp]);

    }, [time])



    const defaultProps = {
        center: {
            lat: 40.595786,
            lng: -105.139870
        },
        zoom: 19
    };

    const heatMapData = {
        positions: activeHeatMap,
        options: {
            radius: 40,
            opacity: 0.6,
        }
    }

    return (
        <Box sx={{ backgroundColor: "#333", position: "relative" }}>
            <Box sx={{ width: "75vw", height: "100vh", backgroundColor: "#333", position: "relative" }}>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDUgiDJfRuv_3aBeipHUT68wc9Nrt4I5EQ" }}
                    options={{
                        mapTypeId: "satellite",
                        tilt: 0,
                        zoomControl: false,


                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    draggable={false}


                    heatmapLibrary
                    heatmap={heatMapData}

                    children={sensors.map(sensor => <Marker lat={sensor.lat} lng={sensor.lng} color="#00FF00" />)}

                >
                </GoogleMapReact >


                <Box sx={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", top: 10, left: 20 }}>
                    <Slider sx={{ color: "#FFF" }} defaultValue={0} min={0} max={!data ? 0 : Object.keys(data).length / 5} onChange={(event, value) => {
                        if (value) {
                            setTime(value * 5)
                        }
                    }} />
                    <Typography width="100%" color="#FFF" fontWeight={500} textAlign="left">{!data ? "Import data set" : new Date(Object.keys(data)[time] * 1000).toUTCString()}</Typography>
                </Box>
            </Box>
        </Box>

    )
}