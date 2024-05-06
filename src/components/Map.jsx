import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([0, 30]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

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
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
