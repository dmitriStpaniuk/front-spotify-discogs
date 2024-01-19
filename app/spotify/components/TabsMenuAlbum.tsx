import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { Avatar, Group, LoadingOverlay, ScrollArea, Text } from "@mantine/core";
import { userAlbumStore } from "@/app/stores/spotify/albumStore";
import { useDisclosure } from "@mantine/hooks";
import { DropdownMenu } from "./DropdownMenu";
import classes from "./TabMenu.module.css";

export const SavedUserAlbums = () => {
  const [visible, { close }] = useDisclosure(true);
  const userPlaylists = userAlbumStore((state) => state.items);
  const fetchUserAlbums = userAlbumStore((state) => state.fetchUserAlbums);

  useEffect(() => {
    fetchUserAlbums({ sdk }).then(() => {
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
      <ScrollArea type="never" h={"82vh"}>
        {userPlaylists?.map((album) => (
          <Group
            wrap="nowrap"
            key={album.album.id}
            mt={10}
            style={{
              cursor: "pointer",
              justifyContent: "space-between",
            }}
            className={classes.link}
          >
            <Group>
              <Avatar src={album.album.images[0]?.url} radius="md" size={50} />
              <div>
                <Text fz="xs" tt="uppercase" fw={700} c="gray">
                  {album.album.name}
                </Text>
                <Group>
                  <Text fz="xs" c="dimmed" style={{ wordWrap: 'break-word', maxWidth: '300px' }}>
                    {album.album.artists.map((owner) => ` ${owner.name}`)}
                  </Text>
                </Group>
              </div>
            </Group>
            <DropdownMenu typeData = 'album'/>
          </Group>
        ))}
      </ScrollArea>
    </>
  );
};
