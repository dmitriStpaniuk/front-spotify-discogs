import { currentUserPlaylists } from '@/app/shared/spotify/currentUser';
import { Page, SimplifiedPlaylist, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { create } from 'zustand';

interface ResponseUserPlaylists extends Page<SimplifiedPlaylist> {
  fetchUserPlaylists: (params: { sdk: SpotifyApi }) => Promise<Page<SimplifiedPlaylist> | null>;
}
export const useUserPlaylistsStore = create<ResponseUserPlaylists>((set, get) => ({
  href: '',
  items: [],
  limit: 0,
  next: '',
  offset: 0,
  previous: '',
  total: 0,
  fetchUserPlaylists: async ({ sdk }: { sdk: SpotifyApi }) => {
    const result = await currentUserPlaylists({ sdk })
    if (result) {
      set(result)
    }
    return result;
  }
}))