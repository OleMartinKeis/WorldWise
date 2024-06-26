import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "./hooks/useGeolocation";
import Button from "./Button";
import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useUrlPosition } from "./hooks/useUrlPosition";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const navigate = useNavigate();

    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([
                    geolocationPosition.lat,
                    geolocationPosition.lng,
                ]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.position.lat, city.position.lng]}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                {mapLat && <ChangeCenter position={mapPosition} />}
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
