import { currentUserLikedSongs } from "@/app/shared/spotify/currentUser";
import { Page, SavedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface ResponseFolowedUserArtists extends Page<SavedTrack> {
  playlistName: string;
  fetchUserLikedSongs: (params: { sdk: SpotifyApi }) => Promise<SavedTrack[] | null>;
  fetchAllUserLikedSongs: (params: { sdk: SpotifyApi }) => Promise<Page<SavedTrack> | null>;
  setLikedPlaylistName: (name: string) => void;
  resetTrack: () => void;
}



export const useUserLikedSongsStore = create<ResponseFolowedUserArtists>((set, get) => ({
  href: '',
  items: [],
  total: 0,
  limit: 0,
  offset: 0,
  previous: null,
  next: '',
  playlistName: '',
  fetchUserLikedSongs: async ({ sdk }: { sdk: SpotifyApi }) => {
    const result = await currentUserLikedSongs({ sdk })
    if (result) {
      set(result)
    }
    return result?.items || null;
  },
  fetchAllUserLikedSongs: async ({ sdk }: { sdk: SpotifyApi }) => {
    const result = await currentUserLikedSongs({ sdk, offset: get().offset, limit: get().limit })
    if (result) {
      set(prevState => ({
        // ...prevState,
        items: [...prevState.items, ...result.items],
        offset: prevState.offset + prevState.limit,
      }));
    }
    return result;
  },
  setLikedPlaylistName: (name: string) => { set({ playlistName: name }) },
  resetTrack: () => {
    set({
      items: [],
      offset: 0,
    })
  },
}))
