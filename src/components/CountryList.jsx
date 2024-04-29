import CityItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (!countries.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    return (
        <ul className={styles.countryList}>
            {countries.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}
