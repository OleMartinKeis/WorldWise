import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
    return (
        <div className={styles.Sidebar}>
            <Logo />
            <AppNav />

            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    {" "}
                    &copy; Copyright {new Date().getFullYear()} by WorldWise
                    inc.
                </p>
            </footer>
        </div>
    );
}
