"use client";
import { AppShell, Divider, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { Playlist } from "./components/Playlist";
import { ProvidersSpotifyDiscogs } from "./components/ProvidersSpotifyDiscogs";
import { Header } from "./components/Header";
import React from "react";
import { useSession } from "next-auth/react";

export default function Spotify() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [visible, setVisible] = useState(true)
  const session = useSession()

  useEffect(() => {
    if (session.status === "authenticated") {
      setVisible(false)
    }
  }, [session.status])

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 7, bg:'dark'}}
        loaderProps={{ color: "green", type: "bars" }}
      />
        <Header
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
        <AppShell.Navbar p="md">
          Playlist
          <Divider my="xs" />
          <Suspense fallback={<Loading />}>
            <Playlist />
          </Suspense>
        </AppShell.Navbar>
        <AppShell.Main>
          <h1 className="">Welcome to Spotify and Discogs</h1>
          <ProvidersSpotifyDiscogs />
        </AppShell.Main>
        <AppShell.Aside p="md">Aside</AppShell.Aside>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      
    </AppShell>
  );
}
