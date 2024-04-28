// Styles
import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.container_loader}>
            <div className={styles.loader} />
        </div>
    );
};

export default Loader;

Loader.displayName = "Loader_Component";
