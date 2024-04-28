// Styles
import styles from "./GitHubUser.module.css";

// components
import Loader from "../Loader/Loader";

// Types
import { IGitHubUserProps } from "../../types";

const GitHubUser = ({ user, repos, loadingRepos }: IGitHubUserProps) => {
    return (
        <div className={styles.container}>
            {" "}
            <div className={styles.card}>
                {user && (
                    <>
                        <div className={styles.line} />
                        <div className={styles.container_avatar}>
                            <img
                                src={user.avatar_url}
                                alt="Avatar de usuario"
                                className={styles.avatar}
                            />
                            <h3>
                                Nombre de usuario:{" "}
                                {user.login || "no existe nombre de usuario"}
                            </h3>
                        </div>
                        <div className={styles.container_statistics}>
                            <p className={styles.statistics}>
                                <b>{user.bio || "No disponible"}</b>
                                <br />
                                Biografía
                            </p>
                            <p className={styles.statistics}>
                                <b>{user.followers || "No disponible"}</b>
                                <br />
                                Seguidores
                            </p>
                            <p className={styles.statistics}>
                                <b>{user.public_repos || "No disponible"}</b>
                                <br />
                                Repositorios públicos
                            </p>
                        </div>
                        <div className={styles.line} />
                    </>
                )}
                {loadingRepos && <Loader />}
                {repos.length > 0 && (
                    <div className={styles.container_recent_repos}>
                        <h3>Repositorios Recientes:</h3>
                        <ul>
                            {repos.map(repo => (
                                <li key={repo.id}>
                                    <strong>{repo.name}</strong> -{" "}
                                    {repo.description || "Sin descripción"}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {repos.length === 0 && user !== null && (
                    <p>No hay repositorios recientes</p>
                )}
            </div>
        </div>
    );
};

export default GitHubUser;

GitHubUser.displayName = "GitHubUser_Component";
