import { useState, useEffect, ChangeEvent } from "react";
import styles from "./App.module.css";

interface IError {
    documentation_url: string;
    message: string;
}

interface IGitHubLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

interface IGitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

interface IGitHubRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: IGitHubLicense | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}

function App() {
    const [user, setUser] = useState<IGitHubUser | null>(null);
    const [repos, setRepos] = useState<IGitHubRepository[]>([]);

    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<IError | null>(null);

    const fetchUser = async username => {
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

            console.log("cai en el try");
        } catch (error) {
            // invalid request
            console.log("cai en el catch");

            setUser(null);
            setError({
                documentation_url: error.documentation_url,
                message: error.message,
            });
        } finally {
            console.log("cai en finally");
            setLoading(false);
        }
    };

    const fetchUserRepos = async username => {
        setLoading(true);
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
            console.error("Error fetching user repos:", error);
            setRepos([]);
            setError({
                documentation_url: error.documentation_url,
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\s/g, "");
        setQuery(value);
    };

    useEffect(() => {
        // console.log("user", user);
        if (user) {
            fetchUserRepos(user.login);
        } else {
            setRepos([]);
        }
    }, [user]);

    useEffect(() => {
        if (repos.length > 0) {
            console.log("repos", repos);
        }
    }, [repos]);

    return (
        <>
            <label htmlFor="usernameInput">Ingresa el nombre de usuario</label>
            <input
                id="usernameInput"
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese un nombre de usuario"
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
            />
            <button
                onClick={() => fetchUser(query)}
                disabled={query === "" ? true : false}
            >
                buscar usuario
            </button>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error.message}</p>}
            {user && (
                <div>
                    <h3>{user.login}</h3>

                    {user.avatar_url && (
                        <img
                            src={user.avatar_url}
                            alt="Avatar"
                            style={{ width: 100 }}
                        />
                    )}
                    <p>{user.bio ?? "no existe biografia"}</p>
                    <p>{user.followers}</p>
                    <p>{user.public_repos}</p>
                </div>
            )}
            {repos.length > 0 && (
                <div>
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
            <div className={styles.container}>inicio</div>
        </>
    );
}

export default App;
