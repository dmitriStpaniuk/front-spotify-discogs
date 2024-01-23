import { userLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import classes from "./TabMenu.module.css";
import {
  defaultPlaylist,
  useShowLikedTracksStore,
  useShowPlaylistStore,
} from "@/app/stores/spotify/playlistsStore";

const playlistName = "Liked Songs";
export const LikedSongsForPlaylistTab = () => {
  // общее количество лайков
  const { total } = userLikedSongsStore();
  // получаю  метод fetchUserLikedSongs
  const { fetchUserLikedSongs } = userLikedSongsStore();
  // просто треки
  const { items } = userLikedSongsStore();
  // сетаю в стор треки для отображения в таблице
  const { setSavedPlaylist: setTracks } = useShowLikedTracksStore();
  // для зануления основных плейлистов
  const { setSimplifiedPlaylist: setPlaylistTracks } = useShowPlaylistStore();
  // для отрисовки в навбаре
  useEffect(() => {
    fetchUserLikedSongs({ sdk }).then(() => {
      close();
    });
  }, [fetchUserLikedSongs]);
  // отправляю для отрисовки в центральный компанент
  const handleClick = () => {
    fetchUserLikedSongs({ sdk });
    setPlaylistTracks(defaultPlaylist);
    setTracks(items, total, playlistName);
  };

  return total ? (
    <Group
      onClick={handleClick}
      wrap="nowrap"
      mt={10}
      // p={15}
      style={{
        cursor: "pointer",
      }}
      className={classes.link}
    >
      <ActionIcon
        variant="gradient"
        size="xl"
        aria-label="Liked"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        <IconHeart />
      </ActionIcon>
      <Group ml={5}>
        <Text fz="xs" tt="uppercase" fw={700} c="gray">
          {playlistName}
        </Text>
        <Group>
          <Text fz="xs" c="dimmed">
            {total} songs
          </Text>
        </Group>
      </Group>
    </Group>
  ) : null;
};
