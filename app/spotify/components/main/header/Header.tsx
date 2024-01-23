import React from "react";
import { HeaderLikedSongs } from "./HeaderLikedSongs";
import { HeaderPlaylistsSongs } from "./HeaderPlaylistsSongs";

export const HeaderHero = () => {
  return (
    <>
      <HeaderLikedSongs />
      <HeaderPlaylistsSongs />
    </>
  );
};
