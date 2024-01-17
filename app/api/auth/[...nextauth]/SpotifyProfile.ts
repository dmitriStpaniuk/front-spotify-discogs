import { config } from "@/app/lib/config";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

if (!config.spotifyClientId) {
  throw new Error("Missing SPOTIFY_CLIENT_ID");
}

if (!config.spotifyClientSecret) {
  throw new Error("Missing SPOTIFY_CLIENT_SECRET");
}

const spotifyProfile = SpotifyProvider({
  clientId: config.spotifyClientId,
  clientSecret: config.spotifyClientSecret,
});

const authURL = new URL("https://accounts.spotify.com/authorize");

const scopes = [
  'user-read-email',
	'user-read-private',
	// 'user-create-partner',
	// 'user-manage-partner',
	// 'user-manage-entitlements',
	// 'user-soa-unlink',
	// 'user-soa-link',
	// 'user-read-private',
	// 'user-read-email',
	'user-library-read',
	// 'user-library-modify',
	// 'user-read-recently-played',
	'user-top-read',
	// 'user-read-playback-position',
	'user-follow-read',
	// 'user-follow-modify',
	// 'playlist-modify-public',
	// 'playlist-modify-private',
	'playlist-read-private',
	// 'playlist-read-collaborative',
	// 'streaming',
	// 'app-remote-control',
	'user-read-playback-state',
	// 'user-modify-playback-state',
	// 'user-read-currently-playing',
];

authURL.searchParams.append("scope", scopes.join(" "));

spotifyProfile.authorization = authURL.toString();

export default spotifyProfile;

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(authURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}