// Styles
import styles from "./Error.module.css";

// Types
import { IError } from "../../types";

const Error = ({ messageError }: { messageError: IError }) => {
    return (
        <div className={styles.container}>
            <div className={styles.container_texts}>
                {messageError && (
                    <>
                        <h2>{messageError.message}</h2>
                        <p>
                            {" "}
                            Para mas informacion visita:{" "}
                            <a
                                href={messageError.documentation_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {messageError.documentation_url}
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Error;

Error.displayName = "Error_Component";
