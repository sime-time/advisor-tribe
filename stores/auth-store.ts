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

  const user = computed(() => {
    if (session.value.data) {
      return session.value.data.user;
    }
    return null;
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

  async function googleRequestScopes() {
    loading.value = true;
    await authClient.linkSocial({
      provider: "google",
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    });
    loading.value = false;
  }

  async function microsoftSignIn() {
    loading.value = true;
    await authClient.signIn.social({
      provider: "microsoft",
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
    user,
    signUp,
    signIn,
    signOut,
    googleSignIn,
    microsoftSignIn,
    googleRequestScopes,
  };
});
