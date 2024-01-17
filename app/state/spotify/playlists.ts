import { create } from 'zustand';
interface Image {
  height: Number | null,
  url: String,
  width: Number | null
}
interface Track {
  href: String,
  total: Number
}
interface ExternalUrls {
  spotify: String
}
interface Owner {
  display_name: String,
  external_urls: ExternalUrls,
  href: String,
  id: String,
  type: String,
  uri: String
}
interface PlaylistCore {
  collaborative: Boolean,
  description: String,
  external_urls: ExternalUrls,
  href: String,
  id: String,
  images: Image[],
  name: String,
  owner: Owner,
  primary_color: String | null,
  public: Boolean,
  snapshot_id: String,
  tracks: Track,
  type: String,
  uri: String,
}
interface ResponseUserPlaylists {
  href: String,
  items: PlaylistCore[],
  limit: Number,
  next: String | null,
  offset: Number,
  previous: String | null,
  total: Number
}
export const useUserPlaylists = create<ResponseUserPlaylists>((set, get) => ({
  href: '',
  items: [],
  limit: 0,
  next: '',
  offset: 0,
  previous: '',
  total: 0,
}))