import { SavedTrack, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

// interface StoreState {
//   tracks: SavedTrack[];
//   total: number;
//   playlistName: string
//   setSavedPlaylist: (tracks: SavedTrack[], total: number, playlistName: string) => void;
//   reset: () => void;
// }
interface PlaylistState {
  playlistTracks: SimplifiedPlaylist;
  setSimplifiedPlaylist: (tracks: SimplifiedPlaylist) => void;
  reset: () => void;
}

// export const useShowLikedTracksStore = create<StoreState>((set, get) => ({
//   tracks: [],
//   total: 0,
//   playlistName: '',
//   setSavedPlaylist: (tracks, total, playlistName) =>
//     set(() => ({
//       tracks,
//       total,
//       playlistName
//     })),
//     reset: () => set({ tracks: [], total: 0, playlistName: '' })
// }));

const defaultPlaylist: SimplifiedPlaylist = {
  followers: { href: '', total: 0 },
  collaborative: false,
  description: '',
  external_urls: {
    spotify: ''
  },
  href: '',
  id: '',
  images: [],
  name: '',
  owner: {
    display_name: '',
    external_urls: { spotify: '' },
    href: '',
    id: '',
    type: '',
    uri: ''
  },
  primary_color: '',
  public: false,
  snapshot_id: '',
  tracks: {
    href: '',
    total: 0
  },
  type: '',
  uri: ''
};

export const useShowPlaylistStore = create<PlaylistState>((set, get) => ({
  playlistTracks: defaultPlaylist,
  setSimplifiedPlaylist: (tracks: SimplifiedPlaylist) => set(() => ({
    playlistTracks: tracks
  })),
  reset: () => { set({ playlistTracks: defaultPlaylist }) }
}))
