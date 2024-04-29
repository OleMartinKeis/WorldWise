import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [
                ...arr,
                { country: city.country, emoji: city.emoji, key: city.id },
            ];
        else return arr;
    }, []);

    if (!countries.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </ul>
    );
}
