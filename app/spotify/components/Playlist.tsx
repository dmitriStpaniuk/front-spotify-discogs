import { useSpotify } from "@/app/lib/useSpotify";
import { Card } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const Playlist = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, status, spotifyApi]);
  console.log(playlists);
  return (
    <>
      {playlists.map((playlist) => (
          <Card
            style={{ cursor: "pointer", margin: '2px' }}
            shadow="sm"
            padding="sm"
            radius="md"
            withBorder
            key={playlist.id}
          >
            {playlist.name}
          </Card>
      ))}
    </>
  );
};
