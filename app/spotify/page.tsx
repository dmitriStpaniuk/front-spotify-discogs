"use client";
import { AppShell, LoadingOverlay, Alert, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { MenuTabs } from "./components/MenuTabs";
import { errorStore } from "../state/spotify/error";
import { IconExclamationCircle, IconLogin } from "@tabler/icons-react";

export default function Spotify() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [visible, setVisible] = useState(true);
  const [authError, setAuthError] = useState(false);

  const session = useSession();
  const errorState = errorStore((state) => state.message);
  
  console.log(authError)
  useEffect(() => {
    if (session.status === "authenticated") {
      setVisible(false);
    }
  }, [session.status]);

  useEffect(() => {
    if (errorState.includes("You should re-authenticate the user")) {
      setAuthError(true);
    }
  }, [errorState, authError]);

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
      { !authError && <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 7, bg: "dark" }}
        loaderProps={{ color: "green", type: "bars" }}
      /> }
      <Header
        mobileOpened={mobileOpened}
        desktopOpened={desktopOpened}
        toggleMobile={toggleMobile}
        toggleDesktop={toggleDesktop}
      />
      <AppShell.Navbar p="md">
        <MenuTabs />
      </AppShell.Navbar>
      <AppShell.Main>
        <h1 className="">Welcome to Spotify and Discogs</h1>
        {authError && (
          <Alert
            title="Ошибка аутентификации"
            icon={ <IconExclamationCircle />}
          >
            Пожалуйста, повторите процесс аутентификации.
            <NavLink
              onClick={() => signIn("spotify")}
              label="SignIn"
              leftSection={<IconLogin stroke={1.5} size="1.3rem"/>}
              style={{ width: '100px'}}
            />
          </Alert>
        )}
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
