import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
    const [searchParams] = useSearchParams();
    const lat = parseFloat(searchParams.get("lat")) || null;
    const lng = parseFloat(searchParams.get("lng")) || null;

    return [lat, lng];
}
