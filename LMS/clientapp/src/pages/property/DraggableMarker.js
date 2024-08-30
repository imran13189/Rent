import { MapContainer, TileLayer,Marker, Popup } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'
import MapMarker from './MapMarker';
import { useRef } from "react";
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import RoomIcon from '@mui/icons-material/Room';
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';

const center = {
    lat: 30.2938312,
    lng: 78.06298795850616,
}

var redIcon = L.icon({
    iconUrl: '/p2.jpg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    const { positionDetails, properties } = useSelector((state) => state.property);

    useEffect(() => {
        if (positionDetails) {

            map.flyTo([positionDetails.lat, positionDetails.lng], 14, {
                duration: 2
            });
        }

    }, [positionDetails]);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker />

            {properties.map((location, idx) => (<CustomMarker key={idx} location={location} />))}
        </>
    );
}

const CustomMarker = ({ location }) => {
    // Create a custom Leaflet icon using the MUI icon
    const iconHtml = ReactDOMServer.renderToStaticMarkup(
        <RoomIcon style={{ fontSize: 30, color: 'red' }} />
    );

    const customIcon = L.divIcon({
        className: 'custom-icon',
        html: iconHtml,
        iconSize: [30, 20],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    return (
        <Marker position={[location.lat, location.long]} icon={customIcon}>
            <Popup>
                <a href={location.propertyUrl} target="_blank" rel="noreferrer"  >{location.description}</a>
            </Popup>
        </Marker>
    );
};

function DraggableMarker() {
    const mapRef = useRef();
    return (
        <MapContainer ref={mapRef} center={center} zoom={13}>
            <MyComponent />
        </MapContainer>
    )
}

export default DraggableMarker;