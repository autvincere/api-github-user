module.exports = {
    parser: "@typescript-eslint/parser", // Especifica el parser de ESLint para TypeScript
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ],
    plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "prettier/prettier": "error",
        indent: "off", // Desactiva la regla de indentación de ESLint
        "@typescript-eslint/indent": "off", // Si estás utilizando @typescript-eslint, también desactiva esta
        "react/react-in-jsx-scope": "off", // Desactiva la regla de react-in-jsx-scope
    },
    settings: {
        react: {
            version: "detect", // Automáticamente detecta la versión de React
        },
    },
    env: {
        browser: true, // Añade esta línea
        es2021: true,
        node: true,
    },
};
