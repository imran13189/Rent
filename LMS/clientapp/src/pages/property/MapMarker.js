import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPosition } from "./../../store/reducers/property";
import { useEffect } from "react";



function MapMarker() {
    const [draggable, setDraggable] = useState(true)
    const markerRef = useRef(null)

    const dispatch = useDispatch();
    const { positionDetails } = useSelector((state) => state.property);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    dispatch(setSelectedPosition({ positionDetails: marker.getLatLng(),showLocation:true}))
                }
            },
        }),
        [],
    );

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);

    useEffect(() => {
        positionDetails;
    }, [positionDetails]);

    return (
        <Marker
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={positionDetails}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span alt="no" role="button" tabIndex={0}  onClick={toggleDraggable}>
                    {draggable
                        ? 'Drag to choose your location'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

export default MapMarker;