import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
	if (event.path.startsWith("/dashboard")) {
		const session = await auth.api.getSession({
			headers: event.headers,
		});
		if (!session) {
			await sendRedirect(event, "/", 302);
		}
	}

	if (event.path.startsWith("/advisor/onboarding")
		|| event.path.startsWith("/advisor/available")
	) {
		const session = await auth.api.getSession({
			headers: event.headers,
		});
		if (!session) {
			await sendRedirect(event, "/", 302);
		}
	}
});
