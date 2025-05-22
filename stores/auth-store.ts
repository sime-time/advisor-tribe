import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
	const toast = useToast();
	const loading = ref(false);

	const session = authClient.useSession();

	const authenticated = computed(() => {
		if (session.value.data) {
			return true;
		}
		return false;
	});

	const userId = computed(() => {
		if (session.value.data) {
			return session.value.data.user.id;
		}
	});

	async function googleSignIn() {
		loading.value = true;
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
			newUserCallbackURL: "/onboarding",
		});
		loading.value = false;
	}

	async function signOut() {
		loading.value = true;
		await authClient.signOut();
		navigateTo("/");
		loading.value = false;
	}

	async function signIn(email: string, password: string) {
		loading.value = true;
		await authClient.signIn.email({
			email,
			password,
		}, {
			onSuccess: () => {
				toast.add({
					title: "Sign In Successful",
					description: "Welcome back!",
					icon: "i-lucide-check",
					color: "success",
				});
				navigateTo("/dashboard");
			},
			onError: (context) => {
				toast.add({
					title: "Sign In Error",
					description: `${context.error.message}`,
					icon: "i-lucide-triangle-alert",
					color: "error",
				});
			},
		});
		loading.value = false;
	}

	async function signUp(name: string, email: string, password: string) {
		loading.value = true;
		await authClient.signUp.email({
			name,
			email,
			password,
			// this image is for testing purposes only
			image: "https://xsgames.co/randomusers/avatar.php?g=male",
		}, {
			onSuccess: () => {
				toast.add({
					title: "New account created",
					description: `Welcome, ${name}`,
					icon: "i-lucide-check",
					color: "success",
				});
				navigateTo("/onboarding");
			},
			onError: (context) => {
				toast.add({
					title: "Sign Up Error",
					description: `${context.error.message}`,
					icon: "i-lucide-triangle-alert",
					color: "error",
				});
			},
		});
		loading.value = false;
	}

	return {
		loading,
		authenticated,
		userId,
		signUp,
		signIn,
		signOut,
		googleSignIn,
	};
});
