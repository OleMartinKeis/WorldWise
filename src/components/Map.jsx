import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "./hooks/useGeolocation";
import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import Button from "./Button";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const mapLat = searchParams.get("lat");

    const mapLng = searchParams.get("lng");

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>
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
        click: (e) => navigate(`form?lat=${e.latlng.lat}&=${e.latlng.lng}`),
    });
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
