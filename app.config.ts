export default defineAppConfig({
	ui: {
		colors: {
			primary: "violet",
			neutral: "slate",
		},
		button: {
			base: "cursor-pointer",
			variants: {
				size: {
					xl: {
						base: "px-4 py-3 text-lg font-medium",
					},
				},
			},
			compoundVariants: [
				{
					color: "primary",
					variant: "solid",
					class: "bg-primary-700 text-white hover:bg-primary-600",
				},
				{
					color: "primary",
					variant: "outline",
					class: "outline outline-primary-700 text-primary-700",
				},
			],
		},
	},
});
