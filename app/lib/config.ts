
export const config = {
	spotifyClientId: process.env.SPOTIFY_CLIENT_ID!,
	spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
	nextAuthSecret: process.env.NEXTAUTH_SECRET!,
	jwtSecret: process.env.JWT_SECRET!,
	maxAge: Number(process.env.SESSION_MAX_AGE!),
	updateAge: Number(process.env.SESSION_UPDATE_AGE!),
	signIn: process.env.SIGNIN_PATH!,
	signOut: process.env.SIGNOUT_PATH!,
};
