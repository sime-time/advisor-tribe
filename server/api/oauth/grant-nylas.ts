import { nylas, nylasConfig } from "~/lib/nylas";

export default defineEventHandler((event) => {
  try {
    const authUrl = nylas.auth.urlForOAuth2({
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
    });

    // Redirect to Nylas OAuth URL
    return sendRedirect(event, authUrl, 302);
  }
  catch (error) {
    console.error("Nylas auth error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate auth URL",
    });
  }
});
