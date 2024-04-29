import styles from "./Button.module.css";

export default function Button({ children, onClick, type }) {
    return (
        <Button onClick={onClick} className={styles.btn}>
            {children}
        </Button>
    );
}
