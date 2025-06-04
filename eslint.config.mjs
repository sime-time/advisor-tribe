import antfu from "@antfu/eslint-config";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(antfu({
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "no-console": 0,
    "ts/no-redeclare": "off",
    "unicorn/filename-case": ["error", {
      cases: {
        kebabCase: true,
        snakeCase: true,
        camelCase: true,
      },
      ignore: ["README.md"],
    }],
  },
}));
