"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMaps() {
    const mapRef = useRef(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                version: 'quarterly',
            });

            const google = await loader.load(); // Load the Google Maps API
            const locationInMap = {
                lat: 26.846067,
                lng: 81.061365,
            };

            const mapOptions = {
                center: locationInMap,
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            };

            const map = new google.maps.Map(mapRef.current, mapOptions); // Correct usage
        };

        initializeMap();
    }, []);

    return (
        <div style={{ height: "500px", width: "100%" }} ref={mapRef}>
        </div>
    );
}
