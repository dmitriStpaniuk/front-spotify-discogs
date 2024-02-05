import { Avatar, Group, ScrollArea, Text, LoadingOverlay } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import React, { useEffect } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useUserPlaylistsStore } from "@/app/stores/spotify/currentUserPlaylistsStore";
import { useDisclosure } from "@mantine/hooks";
import { DropdownMenu } from "./DropdownMenu";
import classes from "./TabMenu.module.css";
import { LikedSongsForPlaylistTab } from "./LikedSongsForPlaylistTab";
// import {
//   useShowLikedTracksStore,
//   useShowPlaylistStore,
// } from "@/app/stores/spotify/playlistsStore";
import { useNavbarStore } from "@/app/stores/spotify/closeNavbarStore";

export const CurrentUserPlaylists = () => {
  const [visible, { close }] = useDisclosure(true);
  // основные запросы за  плейлистами
  const { items } = useUserPlaylistsStore();
  const { fetchUserPlaylists } = useUserPlaylistsStore();
  // сетаем треки в хранилище
  // const { setSimplifiedPlaylist } = useShowPlaylistStore();
  // // треки из хранилища
  // const { playlistTracks } = useShowPlaylistStore();
  // //  для зануления при клике на обычный плейлист
  // const { reset } = useShowLikedTracksStore();

  useEffect(() => {
    fetchUserPlaylists({ sdk }).then(() => {
      close();
    });
  }, []);

  const handleClick = (playlistName: string) => {
    const playlist = items.find((item) => item.name === playlistName);
    if (playlist !== undefined) {
      // reset();
      // setSimplifiedPlaylist(playlist);
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 11 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
      <ScrollArea type="never" h={"90vh"}>
        <LikedSongsForPlaylistTab />
        {items.map((playlist) => (
          <Group
            onClick={() => handleClick(playlist.name)}
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
              <Avatar src={playlist.images[0]?.url} radius="md" size={44} />
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
