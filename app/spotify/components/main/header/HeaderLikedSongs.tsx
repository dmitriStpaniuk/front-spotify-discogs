import { useShowLikedTracksStore } from "@/app/stores/spotify/playlistsStore";
import { Group, Avatar, Text, ActionIcon } from "@mantine/core";
import React from "react";
import classes from "./Header.module.css";
import { useSession } from "next-auth/react";
import { IconHeart } from "@tabler/icons-react";

export const HeaderLikedSongs = () => {
  const { total, playlistName } = useShowLikedTracksStore();
  const { data: session } = useSession();
  const photoUser = session?.user?.image;
  const nameUser = session?.user?.name;

  return (
    <>
      {playlistName && (
        <Group wrap="nowrap" h="17vh" pl={20} className={classes.gradient}>
          <ActionIcon
            variant="gradient"
            size="128"
            aria-label="Liked"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            <IconHeart size={100} />
          </ActionIcon>
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              Private Playlist
            </Text>

            <Text fz="3rem" fw={500} className={classes.name} p={0}>
              {playlistName}
            </Text>

            <Group wrap="nowrap" gap={10} mt={3}>
              <Avatar src={photoUser} size="1.3rem" />
              <Text fz="xs" c="dimmed">
                {`${nameUser} ${total} songs`}
              </Text>
            </Group>
          </div>
        </Group>
      )}
    </>
  );
};
