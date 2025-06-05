import Nylas from "nylas";
import env from "./env";

export const nylasConfig = {
  clientId: env.NYLAS_CLIENT_ID,
  redirectUri: `${env.NUXT_PUBLIC_BASE_URL}/api/oauth/exchange`,
  apiKey: env.NYLAS_API_KEY,
  apiUri: env.NYLAS_API_URI,
};

export const nylas = new Nylas(nylasConfig);
