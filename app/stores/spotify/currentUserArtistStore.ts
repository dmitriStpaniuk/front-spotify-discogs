import { currentUserFollowedArtists } from "@/app/shared/spotify/currentUser";
import { FollowedArtists, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface ResponseUserArtists extends FollowedArtists {
  fetchUserArtists: (params: { sdk: SpotifyApi }) => Promise<FollowedArtists | null>;
}

export const userArtistsStore = create<ResponseUserArtists>((set, get) => ({
  artists: {
    href: '',
    items: [],
    total: 0,
    limit: 0,
    offset: 0,
    previous: null,
    next: null,
  },
  fetchUserArtists: async ({ sdk }: { sdk: SpotifyApi }) => {
    const result = await currentUserFollowedArtists({ sdk })
    if (result) {
      set(result)
    }
    return result;
  }
}))