import React, { useEffect, useState } from "react";
import { Avatar, Text, Group, useMantineTheme } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";
import classes from "./ContentHeader.module.css";
import { userLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import { useShowLikedTracksStore } from "@/app/stores/spotify/playlistsStore";

export const ContentHeader = () => {
  // const [color, setColor] = useState('')
  // const theme = useMantineTheme();
  // const colors = Object.values(theme.colors);
  // const allColorsMantine = [
  //   ...colors.flat()
  // ]
  // useEffect(() => {
  //   setColor(allColorsMantine[Math.floor(Math.random() * allColorsMantine.length)])
  //   console.log(color)
  // }, [])

  const { tracks } = useShowLikedTracksStore();

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);
  return (
    <Group wrap="nowrap" h="40vh" pl={20}>
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        size={128}
        radius="md"
      />
      <div>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Private Playlist
        </Text>

        <Text fz="3rem" fw={500} className={classes.name} p={0}>
          Robert Glassbreaker
        </Text>

        <Group wrap="nowrap" gap={10} mt={3}>
          <Text fz="xs" c="dimmed">
            Name 10 треков, 44 мин. 13 сек.
          </Text>
        </Group>
      </div>
    </Group>
  );
};
