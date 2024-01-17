import { Avatar, Group, ScrollArea, Text } from "@mantine/core";
import { Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { IconPointFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { currentUserPlaylists } from "@/app/shared/spotify/currentUser";

export const Playlist = () => {
  const [playlists, setPlaylists] = useState<Page<SimplifiedPlaylist>>();
  
  useEffect(() => {
    (async () => {
      const result = await currentUserPlaylists({ sdk });
      setPlaylists(result);
    })();
  }, []);
  return (
    <ScrollArea type="never">
      {playlists?.items.map((playlist) => (
        <Group
          wrap="nowrap"
          key={playlist.id}
          mt={10}
          style={{ cursor: "pointer", ":hover": { backgroundColor: "green" } }}
        >
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
      ))}
    </ScrollArea>
  );
};
