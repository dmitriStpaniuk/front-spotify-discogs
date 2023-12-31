import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface DiscogsProfile extends Record<string, any> {
  id: number;
  username: string;
  resource_url: string;
  consumer_name: string;
}

const DiscogsProvider = <P extends DiscogsProfile>(options: OAuthUserConfig<P>): OAuthConfig<P> => ({
  id: "discogs",
  name: "Discogs",
  type: "oauth",
  version: "1.0",
  encoding: "PLAINTEXT",
  authorization: "https://www.discogs.com/oauth/authorize",
  accessTokenUrl: "https://api.discogs.com/oauth/access_token",
  requestTokenUrl: "https://api.discogs.com/oauth/request_token",
  profileUrl: "https://api.discogs.com/oauth/identity",
  async profile(profile, tokens) {
    const url = new URL(`https://api.discogs.com/users/${profile.username}`);
    url.searchParams.set("oauth_consumer_key", options.clientId);
    url.searchParams.set("oauth_token", tokens.oauth_token as string);
    url.searchParams.set("oauth_token_secret", tokens.oauth_token_secret as string);

    const res = await fetch(url);
    const data = await res.json();
    return {
      id: profile.id.toString(),
      name: profile.username,
      email: data.email,
      image: data.avatar_url,
    };
  },
  style: {
    logo: "https://www.svgrepo.com/show/330306/discogs.svg",
    // logoDark: "https://www.svgrepo.com/show/330306/discogs.svg",
    bg: "#fff",
    text: "#000000",
    // bgDark: "#000000",
    // textDark: "#fff",
  },
  options,
});

export default DiscogsProvider;