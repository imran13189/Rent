import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

// function MapMarker() {
//    const map = useMap();

//    return (
//        <div>
//            <Marker
//                position={[33.91907336973602, 35.51552625946782]}
//                eventHandlers={{
//                    click: (e) => {
//                        map.flyTo(e.latlng, 14);
//                    },
//                }}
//            ></Marker>
//        </div>
//    );
//}

const center = {
    lat: 30.2938312,
    lng: 78.06298795850616,
}

function MapMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                debugger;
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span alt="no" role="button" tabIndex={0}  onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

export default MapMarker;