import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { Avatar, Group, LoadingOverlay, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DropdownMenu } from "./DropdownMenu";
import classes from "./TabMenu.module.css";
import { userArtistsStore } from "@/app/stores/spotify/currentUserArtistStore";

export const CurrentUserSawedArtist = () => {
  const [visible, { close }] = useDisclosure(true);
  const userArtists = userArtistsStore((state) => state?.artists.items);
  const fetchUserArtists = userArtistsStore((state) => state?.fetchUserArtists);

  useEffect(() => {
    fetchUserArtists({ sdk }).then(() => {
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
      <ScrollArea type="never" h={"90vh"}>
        {userArtists?.map((album) => (
          <Group
            wrap="nowrap"
            key={album.id}
            mt={10}
            style={{
              cursor: "pointer",
              justifyContent: "space-between",
            }}
            className={classes.link}
          >
            <Group>
              <Avatar src={album.images[0]?.url} radius="md" size={50} />
              <div>
                <Text fz="xs" tt="uppercase" fw={700} c="gray">
                  {album.name}
                </Text>
                <Group>
                  <Text
                    fz="xs"
                    c="dimmed"
                    style={{ wordWrap: "break-word", maxWidth: "300px" }}
                  >
                    {album.genres.join(", ") + "."}
                  </Text>
                </Group>
              </div>
            </Group>
            <DropdownMenu typeData="artist" />
          </Group>
        ))}
      </ScrollArea>
    </>
  );
};
