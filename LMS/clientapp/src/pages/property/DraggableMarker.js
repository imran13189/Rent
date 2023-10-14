import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'
import MapMarker from './MapMarker';
import { useRef } from "react";
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";



const center = {
    lat: 30.2938312,
    lng: 78.06298795850616,
}

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    const { positionDetails } = useSelector((state) => state.property);   

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
        </>
    )
}

function DraggableMarker() {
    const mapRef = useRef();
    return (
        <MapContainer ref={mapRef} center={center} zoom={13}>
            <MyComponent />
        </MapContainer>
    )
}

export default DraggableMarker;