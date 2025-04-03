import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": ts,
        },
        rules: {
            "no-console": ["warn", { allow: ["warn", "error"] }],
        },
    },
];
