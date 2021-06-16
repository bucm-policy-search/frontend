module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb",
        "prettier",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "semi": ["error", "always"],
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "react/jsx-props-no-spreading": "off",
        "no-underscore-dangle": ["error", { "allow": ["_source"] }],
        "no-use-before-define": ["error", { "functions": false, "variables": false }]
    }
};
