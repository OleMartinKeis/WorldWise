import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");

    const mapLng = searchParams.get("lng");

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );
    console.log(mapLat);
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
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
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ positon }) {
    const map = useMap();
    map.setView(positon);
    return null;
}
