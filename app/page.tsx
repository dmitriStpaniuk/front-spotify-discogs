"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import sdk from "./lib/spotify-sdk/ClientInstance";
import { useEffect, useState } from "react";
import {
  Page,
  SavedTrack,
  SearchResults,
  SimplifiedPlaylist,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { HeaderButtonThemeSignSignOut } from "./components/header/HeaderButtonThemeSignSignOut";
import { AppShell, Group, LoadingOverlay } from "@mantine/core";
import { HeroTitle } from "./components/main/HeroTitle";
import { Footer } from "./components/footer/Footer";

export default function Home() {
  // const [visible, setVisible] = useState(true);
  const session = useSession();

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     setVisible(false);
  //   }
  // }, [session.status]);
  return (
    <AppShell header={{ height: 60 }} >
      {/* <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 7, bg: "dark" }}
        loaderProps={{ color: "green", type: "bars" }}
      /> */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <HeaderButtonThemeSignSignOut />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <HeroTitle />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}