import { userLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import { Group, Text } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import classes from "./TabMenu.module.css";

export const LikedSongsForPlaylistTab = () => {
  const totalNumberOfLikes = userLikedSongsStore((state) => state.total);
  const imageLikedSongs = userLikedSongsStore((state) => state);
  console.log(imageLikedSongs)
  const fetchUserLikedSongs = userLikedSongsStore(
    (state) => state.fetchUserLikedSongs
  );
  useEffect(() => {
    fetchUserLikedSongs({ sdk }).then(() => {
      close();
    });
  }, []);
  return (
    <Group
      wrap="nowrap"
      mt={10}
      p={15}
      style={{
        cursor: "pointer",
        // justifyContent: "space-between",
      }}
      className={classes.link}
    >
      <IconHeartFilled radius="md" />
      <Group ml={5}>
        <Text fz="xs" tt="uppercase" fw={700} c="gray">
          Liked Songs
        </Text>
        <Group>
          <Text fz="xs" c="dimmed">
            {totalNumberOfLikes} songs
          </Text>
        </Group>
      </Group>
    </Group>
  );
};
