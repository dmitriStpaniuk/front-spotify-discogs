import { userLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import classes from "./TabMenu.module.css";
import { useShowLikedTracksStore } from "@/app/stores/spotify/playlistsStore";

export const LikedSongsForPlaylistTab = () => {
  const { total } = userLikedSongsStore();
  const { fetchUserLikedSongs } = userLikedSongsStore();
  const { items } = userLikedSongsStore();
  const { setTracks } = useShowLikedTracksStore();

  useEffect(() => {
    fetchUserLikedSongs({ sdk }).then(() => {
      close();
    });
  }, [fetchUserLikedSongs]);

  const handleClick = () => {
    setTracks(items);
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
          Liked Songs
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
