import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { currentUserAlbums } from "@/app/shared/spotify/currentUser";
import { Page, SavedAlbum } from "@spotify/web-api-ts-sdk";
import { Avatar, Group, ScrollArea, Text } from "@mantine/core";

export const SavedUserAlbums = () => {
  const [albums, setAlbums] = useState<Page<SavedAlbum> | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const result = await currentUserAlbums({ sdk });
      setAlbums(result);
    })();
  }, [session, status]);

  return (
    <ScrollArea type="never" h={"82vh"}>
      {albums?.items.map((album) => (
        <Group
          wrap="nowrap"
          key={album.album.id}
          mt={10}
          style={{ cursor: "pointer", ":hover": { backgroundColor: "green" } }}
        >
          <Avatar src={album.album.images[0]?.url} radius="md" size={50} />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="gray">
              {album.album.name}
            </Text>
            <Group>
              <Text fz="xs" c="dimmed" >
                {album.album.artists.map((owner) => ` ${owner.name}`)}
              </Text>
            </Group>
          </div>
        </Group>
      ))}
    </ScrollArea>
  );
};
