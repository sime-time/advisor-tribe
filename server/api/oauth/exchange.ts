import { updateUser } from "~/db/queries/update/update-user";
import { auth } from "~/lib/auth";
import { nylas, nylasConfig } from "~/lib/nylas";

export default defineEventHandler(async (event) => {
	// Only authenticated users can access this route
	const session = await auth.api.getSession({
		headers: event.headers,
	});
	if (!session) {
		return createError({
			statusCode: 400,
			message: "User not authenticated",
		});
	}

	// Get the code from query parameters
	const query = getQuery(event);
	const code = query.code as string;
	if (!code) {
		return createError({
			statusCode: 400,
			message: "No authorization code returned from Nylas",
		});
	}

	try {
		const response = await nylas.auth.exchangeCodeForToken({
			clientSecret: nylasConfig.apiKey,
			clientId: nylasConfig.clientId,
			redirectUri: nylasConfig.redirectUri,
			code,
		});

		// Update this user's data
		const { grantId, email } = response;
		const userId = Number.parseInt(session.user.id);
		await updateUser({
			id: userId,
			grantId,
			grantEmail: email,
		});

		return sendRedirect(event, "/dashboard", 200);
	}
	catch (error) {
		console.error("Error exchanging code for token:", error);
		return createError({
			statusCode: 500,
			message: "Failed to exchange authorization code for token",
		});
	}
});
