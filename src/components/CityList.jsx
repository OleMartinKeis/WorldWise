import styles from "./CityList.module.css";
import Spinner from "./Spinner";

export default function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    return <ul className={styles.cityList}>City</ul>;
}
