import SpotifyWebApi from 'spotify-web-api-node';
import { config } from '@/app/lib/config';

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'streaming',
	'user-read-private',
	'user-library-read',
	'user-top-read',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-follow-read',
	// 'user-follow-modify',
].join(',');

const params = {
	scopes,
};

const queryParamString = new URLSearchParams(params);

const loginUrl = 'https://accounts.spotify.com/authorize?' + queryParamString.toString();


const spotifyApi = new SpotifyWebApi({
	clientId: config.spotifyClientId,
	clientSecret: config.spotifyClientSecret,
});

export default spotifyApi;
export { loginUrl };
