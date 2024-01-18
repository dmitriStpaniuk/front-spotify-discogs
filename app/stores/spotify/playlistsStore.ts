import { currentUserPlaylists } from '@/app/shared/spotify/currentUser';
import { Page, SimplifiedPlaylist, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { create } from 'zustand';

interface Image {
  height: number | null,
  url: string,
  width: number | null
}
interface Track {
  href: string,
  total: number
}
interface ExternalUrls {
  spotify: string
}
interface Owner {
  display_name: string,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  type: string,
  uri: string
}
interface PlaylistCore {
  collaborative: boolean,
  description: string,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  owner: Owner,
  primary_color: string | null,
  public: boolean,
  snapshot_id: string,
  tracks: Track,
  type: string,
  uri: string,
}
interface ResponseUserPlaylists {
  href: string,
  items: PlaylistCore[],
  limit: number,
  next: string | null,
  offset: number,
  previous: string | null,
  total: number,
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
      set(result as unknown as ResponseUserPlaylists)
    }
    return result;
  }
}))