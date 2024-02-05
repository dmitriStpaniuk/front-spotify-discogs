import { useUserLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import classes from "./TabMenu.module.css";

const playlistName = "Liked Songs";
export const LikedSongsForPlaylistTab = () => {
  // общее количество лайков
  const { total } = useUserLikedSongsStore();
  // отрисовка плейлиста лайков
  const { fetchUserLikedSongs } = useUserLikedSongsStore();
  // для отрисовки в навбаре
  const { setLikedPlaylistName } = useUserLikedSongsStore();

  useEffect(() => {
    fetchUserLikedSongs({ sdk })
  }, [fetchUserLikedSongs]);
  // сетаю имя плейлиста в стор для реагировани на отрисовку в таблице
  const handleClick = (playlistName: string) => {
    setLikedPlaylistName(playlistName);
  };

  return total ? (
    <Group
      onClick={() => handleClick("LikedPlaylist")}
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
