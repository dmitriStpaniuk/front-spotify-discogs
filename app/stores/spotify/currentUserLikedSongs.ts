import { currentUserLikedSongs } from "@/app/shared/spotify/currentUser";
import { Page, SavedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface ResponseFolowedUserArtists extends Page<SavedTrack> {
  fetchUserLikedSongs: (params: { sdk: SpotifyApi }) => Promise<Page<SavedTrack> | null>;
}



export const userLikedSongsStore = create<ResponseFolowedUserArtists>((set, get) => ({
    href: '',
    items: [],
    total: 0,
    limit: 0,
    offset: 0,
    previous: null,
    next: null,
  fetchUserLikedSongs: async ({ sdk }: { sdk: SpotifyApi }) => {
    const result = await currentUserLikedSongs({ sdk })
    if (result) {
      set(result)
    }
    return result;
  }
}))

