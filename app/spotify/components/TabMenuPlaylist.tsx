import { Avatar, Group, ScrollArea, Text, LoadingOverlay } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useUserPlaylistsStore } from "@/app/stores/spotify/playlistsStore";
import { useDisclosure } from "@mantine/hooks";
import { DropdownMenu } from "./DropdownMenu";
import classes from "./TabMenu.module.css";

export const CurrentUserPlaylists = () => {
  const [visible, { close }] = useDisclosure(true);
  const userPlaylists = useUserPlaylistsStore((state) => state.items);
  const fetchUserPlaylists = useUserPlaylistsStore(
    (state) => state.fetchUserPlaylists
  );

  useEffect(() => {
    fetchUserPlaylists({ sdk }).then(() => {
      close();
    });
  }, []);

  return (
    <>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 11 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
      <ScrollArea type="never">
        {userPlaylists.map((playlist) => (
          <Group
            wrap="nowrap"
            key={playlist.id}
            mt={10}
            style={{
              cursor: "pointer",
              justifyContent: "space-between",
            }}
            className={classes.link}
          >
            <Group>
              <Avatar src={playlist.images[0]?.url} radius="md" />
              <div>
                <Text fz="xs" tt="uppercase" fw={700} c="gray">
                  {playlist.name}
                </Text>
                <Group>
                  <Text fz="xs" c="dimmed">
                    {playlist.type}
                  </Text>
                  <IconPointFilled stroke={1.5} size="1rem" />
                  <Text fz="xs" c="dimmed">
                    {playlist.owner.display_name}
                  </Text>
                </Group>
                <Group>
                  <Text fz="xs" c="dimmed">
                    {playlist.tracks?.total} songs
                  </Text>
                </Group>
              </div>
            </Group>
            <DropdownMenu typeData="playlist" />
          </Group>
        ))}
      </ScrollArea>
    </>
  );
};
