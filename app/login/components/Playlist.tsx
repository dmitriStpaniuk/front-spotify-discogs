import { useSpotify } from "@/app/lib/useSpotify";
import { Paper, Text, Container, Stack, Card } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const Playlist = async () => {
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

  return (
    <>
      {playlists.map((playlist, index) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder key={playlist.id}>
          {playlist.name}
        </Card>
      ))}
    </>
  );
};
