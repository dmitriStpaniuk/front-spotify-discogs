import { JWT } from "next-auth/jwt";
import spotifyApi from "./spotify";

export async function refreshAccesToken(token: JWT) {
	try {
		spotifyApi.setAccessToken(token.accessToken as string);
		spotifyApi.setRefreshToken(token.refreshToken as string);
 
		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
 
		let accessTokenExpires;
		if (refreshedToken.expires_in !== undefined) {
			accessTokenExpires = Date.now() + (refreshedToken.expires_in * 1000);
		} else {
			// Set accessTokenExpires to a default value if refreshedToken.expires_in is not defined
			accessTokenExpires = Date.now() + (3600 * 1000); // 1 hour from now
		}

		console.log('REFRESHED TOKEN IS', refreshedToken);
 
		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
 }