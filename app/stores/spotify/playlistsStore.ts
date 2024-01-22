import { SavedTrack } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface StoreState {
  tracks: SavedTrack[];
  setTracks: (tracks: SavedTrack[]) => void;
}

export const useShowLikedTracksStore = create<StoreState>((set, get) => ({
  tracks: [],
  setTracks: (tracks: SavedTrack[]) =>
    set(() => ({
      tracks,
    })),
}));