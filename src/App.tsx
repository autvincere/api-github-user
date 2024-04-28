import { useState, useEffect, ChangeEvent } from "react";

// Types
import { IGitHubUser, IGitHubRepository, IError } from "./types";

// Components
import Header from "./components/Header/Header";
import GitHubUser from "./components/GitHubUser/GitHubUser";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

function App() {
    const [user, setUser] = useState<IGitHubUser | null>(null);
    const [repos, setRepos] = useState<IGitHubRepository[]>([]);

    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null);

    const fetchUser = async (username: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`,
            );
            const data = await response.json();

            // no existe usuario
            if (!response.ok) {
                setUser(null);
                throw {
                    message: `${data.message}`,
                    documentation_url:
                        data.documentation_url || "URL no disponible",
                };
            }

            setUser(data);
            setError(null);
        } catch (error) {
            // invalid request
            setUser(null);
            setError({
                documentation_url:
                    error.documentation_url || "URL no disponible",
                message: error.message || "Error desconocido",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchUserRepos = async (username: string) => {
        setLoadingRepos(true);
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=created&direction=desc`,
            );
            const repos = await response.json();
            if (!response.ok) {
                setRepos([]);
                throw new Error(repos.message || "Failed to fetch repos");
            }
            setRepos(repos);
            setError(null);
        } catch (error) {
            setRepos([]);
            setError({
                documentation_url:
                    error.documentation_url || "URL no disponible",
                message: error.message || "Error desconocido",
            });
        } finally {
            setLoadingRepos(false);
        }
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\s/g, "");
        setQuery(value);
    };

    useEffect(() => {
        if (user) {
            fetchUserRepos(user.login);
        } else {
            setRepos([]);
        }
    }, [user]);

    return (
        <>
            <Header
                query={query}
                handleInput={handleInput}
                fetchUser={fetchUser}
            />
            {loading && <Loader />}
            {error && <Error messageError={error} />}
            <GitHubUser user={user} repos={repos} loadingRepos={loadingRepos} />
            <Footer />
        </>
    );
}

export default App;
