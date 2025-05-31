export default defineAppConfig({
	ui: {
		colors: {
			primary: "violet",
			neutral: "slate",
		},
		toaster: {
			defaultVariants: {
				position: "top-center",
			},
		},
		separator: {
			slots: {
				label: "text-neutral-500/50",
			},
		},
		avatar: {
			variants: {
				size: {
					"2xl": {
						root: "size-20",
					},
					"3xl": {
						root: "size-50",
					},
				},
			},
		},
		input: {
			variants: {
				size: {
					lg: {
						base: "text-base",
					},
				},
			},
		},
		textarea: {
			variants: {
				size: {
					lg: {
						base: "text-base",
					},
				},
			},
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
