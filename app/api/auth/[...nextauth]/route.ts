import { config } from '@/app/lib/config';
import SpotifyProvider from 'next-auth/providers/spotify';
import { type JWT } from 'next-auth/jwt';
import { loginUrl } from '@/app/lib/spotify';
import NextAuth, { Account, Profile, Session, User } from 'next-auth';
import { refreshAccesToken } from '@/app/lib/token';
import DiscogsProvider from '@/app/lib/discogs';
import { fetchUserStore } from '@/app/state/user';

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
	throw new Error('Environment variables SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are not defined');
}

type ExtendedUser = User & { accessToken: string };


const handler = NextAuth(
	{
		providers: [
			SpotifyProvider({
				clientId: config.spotifyClientId,
				clientSecret: config.spotifyClientSecret,
				authorization: loginUrl,
			}),
			DiscogsProvider({
				clientId: config.discogsId,
				clientSecret: config.discogsSecret
			})
		],
		// pages: {
		// 	signIn: '/login',
		// 	signOut: '/',
		// 	// error: '/auth/error',
		// },
		secret: config.jwtSecret,
		session: {
			strategy: 'jwt',
			maxAge: Number(config.maxAge),
			updateAge: config.updateAge,
		},
		callbacks: {
			async session(params: { session: Session; token: JWT }) {
				if (params?.session && params.token && params.session.user) {
					if (typeof params.token.accessToken === 'string') {
						(params.session.user as ExtendedUser).accessToken = params.token.accessToken;
					}
				}
				const user = await fetchUserStore.getState().fetchUser();
				return params.session;
			},
			async jwt(params: { token: JWT; user?: User; profile?: Profile; isNewUser?: boolean; account?: Account | null }) {
				if (params.account?.provider === 'discogs') {
					const newToken: JWT = {
						...params.token,
						accessDiscogsToken: params.account.oauth_token,
						secretDiscogsToken: params.account.oauth_token_secret,
						nameNetwork: params.account.provider,
					}
					console.log('DISCOGS TOKEN', newToken);
					return newToken;
				}
				if (params.token.provider === 'spotify' && params.account && params.user && params.account.expires_at) {
					const newToken: JWT = {
						...params.token,
						accessToken: params.account.access_token,
						refreshToken: params.account.refresh_token,
						accessTokenExpires: Number(params.account.expires_at * 1000),
						userName: params.account.providerAccountId,
						provider: params.account.provider,
					};
					return newToken;
				}

				if (typeof params.token.accessTokenExpires === 'number'
					&& Date.now() < params.token.accessTokenExpires) {
					console.log('ACCESS TOKEN IS VALID');
					return params.token;
				}

				console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
				return refreshAccesToken(params.token);

			},
			async signIn(params: { user: User; account: Account | null; profile?: Profile; }) {
				return true;
			},
		},
	}
)

export { handler as GET, handler as POST };
