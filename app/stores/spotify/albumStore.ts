import { currentUserAlbums } from "@/app/shared/spotify/currentUser";
import { Page, SavedAlbum, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";


interface ResponseUserAlbums extends Page<SavedAlbum> {
  fetchUserAlbums: (params: { sdk: SpotifyApi }) => Promise<Page<SavedAlbum> | null>;
}

export const userAlbumStore = create<ResponseUserAlbums>((set, get)=>({
    items: [],
    total: 0,
    limit: 0,
    offset: 0,
    href: "",
    previous: "",
    next: "",
    fetchUserAlbums: async ({ sdk }: { sdk: SpotifyApi }) => {
      const result = await currentUserAlbums({ sdk })
      if (result) {
        set(result)
      }
      return result;
    }
}))