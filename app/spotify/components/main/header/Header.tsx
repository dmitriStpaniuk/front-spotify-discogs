import React from "react";
import { HeaderLikedSongs } from "./HeaderLikedPlaylist";
import { HeaderTablePlaylistsName } from "./HeaderPlaylists";

export const HeaderHero = () => {
  return (
    <>
      <HeaderLikedSongs />
      <HeaderTablePlaylistsName />
    </>
  );
};
