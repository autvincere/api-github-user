// Styles
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.container}>
            {" "}
            <p>© {new Date().getFullYear()} - Eduardo Palma</p>
        </footer>
    );
};

export default Footer;

Footer.displayName = "Footer_Component";
