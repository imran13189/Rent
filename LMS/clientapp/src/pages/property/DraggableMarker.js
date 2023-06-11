import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'
//import { createRoot } from "react-dom/client";
import MapMarker from './MapMarker';
import { useRef } from "react";
import 'leaflet/dist/leaflet.css';

//const rootElement = document.getElementById("root");
//const root = createRoot(rootElement);

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

//function DraggableMarker() {

//    const mapRef = useRef();
//    return(
//        <MapContainer ref={mapRef} center={center} zoom={13} scrollWheelZoom={false}>
//            <TileLayer
//                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//            />
//            <Markerwhatever />
//        </MapContainer>
//    )

//}

export default DraggableMarker;