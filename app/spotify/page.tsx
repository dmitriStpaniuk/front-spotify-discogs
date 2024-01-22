"use client";
import { AppShell, Alert, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../components/header/Header";
import React from "react";
import { signIn } from "next-auth/react";
import { MenuTabs } from "./components/navbar/MenuTabs";
import { IconExclamationCircle, IconLogin } from "@tabler/icons-react";
import { useErrorStore } from "../stores/spotify/errorStore";
import { ContentHeader } from "./components/main/header/components/ContentHeader";

export default function Spotify() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const errorState = useErrorStore((state) => state.message);

  const authError = errorState.includes("You should re-authenticate the user");

  return (
    <AppShell
      transitionDuration={700}
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 470,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
    >
      <Header
        mobileOpened={mobileOpened}
        desktopOpened={desktopOpened}
        toggleMobile={toggleMobile}
        toggleDesktop={toggleDesktop}
      />
      <AppShell.Navbar p="xs" zIndex={1} >
        <MenuTabs />
      </AppShell.Navbar>
      <AppShell.Main>
        {authError && (
          <Alert title="Ошибка аутентификации" icon={<IconExclamationCircle />}>
            Пожалуйста, повторите процесс аутентификации.
            <NavLink
              onClick={() => signIn("spotify")}
              label="SignIn"
              leftSection={<IconLogin stroke={1.5} size="1.3rem" />}
              style={{ width: "100px" }}
            />
          </Alert>
        )}
        <ContentHeader />
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
