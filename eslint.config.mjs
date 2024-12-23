import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { NewLineKind } from "typescript";
import { rules } from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
  },
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          newlinesBetween: "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ["components/ui/**"],
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;
