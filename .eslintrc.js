module.exports = {
    "parser": "babel-eslint",
    "env": {
        "node": true,
        "browser": true,
        "amd": true,
        "es6": true
    },
    "globals": {
        "p5Gif": true,
        "createImage": true,
        "color": true,
        "p5": true,
        "image": true
    },
    "root": true,
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "babel"
    ],
    "rules": {
        "indent": [0, 4],
        "multi-line": [0, "multi-line"],
        "no-cond-assign": [
            2,
            "except-parens"
        ],
        "eqeqeq": ["error", "smart"],
        "no-use-before-define": [
            2,
            {
                "functions": false
            }
        ],
        "new-cap": 0,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": ["error", {
            "args": "none"
        }],
        "no-empty": ["error", {
            "allowEmptyCatch": true
        }],
        "no-console": "off"
    }
};