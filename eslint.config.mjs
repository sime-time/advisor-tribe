import antfu from "@antfu/eslint-config";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(antfu({
	vue: true,
	typescript: true,
	formatters: true,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
}, {
	rules: {
		"no-console": false,
		"ts/no-redeclare": "off",
		"unicorn/filename-case": ["error", {
			cases: {
				kebabCase: true,
				snakeCase: true,
			},
			ignore: ["README.md"],
		}],
	},
}));
