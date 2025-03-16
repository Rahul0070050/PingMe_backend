import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
    languageOptions: {
        parser: tsParser,
    },
    plugins: {
        "@typescript-eslint": ts,
    },
    extends: [
        js.configs.recommended,
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "no-console": ["warn", { allow: ["warn", "error"] }],
    },
};
