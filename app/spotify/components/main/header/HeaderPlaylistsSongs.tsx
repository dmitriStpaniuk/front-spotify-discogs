import { useShowPlaylistStore } from "@/app/stores/spotify/playlistsStore";
import { Group, Avatar, Text } from "@mantine/core";
import React, { useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/dist/client/link";

export const HeaderPlaylistsSongs = () => {
  const { playlistTracks } = useShowPlaylistStore();

  return (
    <>
      {playlistTracks.name.length !== 0 && (
        <Group wrap="nowrap" h="17vh" pl={20} className={styles.gradient}>
          {playlistTracks.images ? (
            <Avatar
              src={playlistTracks.images[0].url}
              size="8rem"
              radius="4%"
            />
          ) : null}
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              Publick Playlist
            </Text>
            <Text fw={500} className={styles.name} p={0}>
              {playlistTracks.name}
            </Text>
            <Group wrap="nowrap" gap={10} mt={3} align="flex-end">
              {playlistTracks.images ? (
                <Avatar src={playlistTracks.images[0].url} size="1.3rem" />
              ) : null}
              <Link href={`/artist/${playlistTracks.owner.href}`}>
                {playlistTracks.owner.display_name}
              </Link>
              <Text fz="sm" c="dimmed">
                {`${playlistTracks.tracks?.total} songs`}
              </Text>
            </Group>
          </div>
        </Group>
      )}
    </>
  );
};
