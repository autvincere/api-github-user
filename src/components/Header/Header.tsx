// Styles
import styles from "./Header.module.css";

// Types
import { IHeaderProps } from "../../types";

const Header = ({ query, handleInput, fetchUser }: IHeaderProps) => {
    return (
        <div className={styles.container}>
            <header>
                <h1>Buscador de usuarios</h1>
            </header>

            <div className={styles.container__input}>
                <label htmlFor="usernameInput">Nombre de usuario</label>
                <form
                    className={styles.container__input_button}
                    onSubmit={e => {
                        e.preventDefault();
                        fetchUser(query);
                    }}
                >
                    <input
                        id="usernameInput"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Ingrese un nombre"
                        value={query}
                        onChange={handleInput}
                    />
                    <button type="submit" disabled={!query}>
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Header;

Header.displayName = "Header_Component";
