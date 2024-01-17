import { errorStore } from "@/app/state/spotify/error";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const currentUserPlaylists = async ({ sdk }: { sdk: SpotifyApi }) => {
  try {
    const result = await sdk.currentUser.playlists.playlists();
    return result
  } catch (e) {
    if (e instanceof Error) {
      errorStore.setState({ message: e.message });
    }
  }
}



// audiobooks
// episodes
// playlists
// shows
