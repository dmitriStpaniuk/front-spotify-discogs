import { MaxInt, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { checkError } from "./lib/error";

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
    checkError(e)
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
    checkError(e)
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
    checkError(e)
    return null
  }
}
export const currentUserLikedSongs = async ({ sdk, offset, limit }: { sdk: SpotifyApi, offset?: number, limit?: number }) => {

  if (typeof sdk !== 'object' || !(sdk instanceof SpotifyApi)) {
    throw new Error('Invalid input parameter. Expected an object with a `sdk` property of type `SpotifyApi`');
  }
  try {
    if (sdk && sdk.currentUser && sdk.currentUser.tracks.savedTracks) {

      const result = await sdk.currentUser.tracks.savedTracks(limit as MaxInt<50>, offset);
      return result;

    } else {
      throw new Error('Invalid SDK or missing playlists');
    }
  } catch (e) {
    checkError(e)
    return null
  }
}
// audiobooks
// episodes
// playlists
// shows
