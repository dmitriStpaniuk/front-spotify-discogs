import { errorStore } from "@/app/stores/spotify/errorStore";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const currentUserPlaylists = async ({ sdk }: { sdk: SpotifyApi }) => {
  if (typeof sdk !== 'object' || !(sdk instanceof SpotifyApi)) {
    throw new Error('Invalid input parameter. Expected an object with a `sdk` property of type `SpotifyApi`');
  }
  try {
    if (sdk && sdk.currentUser && sdk.currentUser.playlists) {
      const result = await sdk.currentUser.playlists.playlists();
      return result;
    } else {
      throw new Error('Invalid SDK or missing playlists');
    }
  } catch (e) {
    if (e instanceof Error) {
      errorStore.setState({ message: e.message });
    }
    return null
  }
}


export const currentUserAlbums = async ({ sdk }: { sdk: SpotifyApi }) => {
  if (typeof sdk !== 'object' || !(sdk instanceof SpotifyApi)) {
    throw new Error('Invalid input parameter. Expected an object with a `sdk` property of type `SpotifyApi`');
  }
  try {
    if (sdk && sdk.currentUser && sdk.currentUser.albums) {
      const result = await sdk.currentUser.albums.savedAlbums();
      return result;
    } else {
      throw new Error('Invalid SDK or missing playlists');
    }
  } catch (e) {
    if (e instanceof Error) {
      errorStore.setState({ message: e.message });
    }
    return null
  }
}

export const currentUserFollowedArtists = async ({ sdk }: { sdk: SpotifyApi }) => {
  if (typeof sdk !== 'object' || !(sdk instanceof SpotifyApi)) {
    throw new Error('Invalid input parameter. Expected an object with a `sdk` property of type `SpotifyApi`');
  }
  try {
    if (sdk && sdk.currentUser && sdk.currentUser.followedArtists) {
      const result = await sdk.currentUser.followedArtists();
      return result;
    } else {
      throw new Error('Invalid SDK or missing playlists');
    }
  } catch (e) {
    if (e instanceof Error) {
      errorStore.setState({ message: e.message });
    }
    return null
  }
}
// audiobooks
// episodes
// playlists
// shows
