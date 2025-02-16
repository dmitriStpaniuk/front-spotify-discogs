"use client";
import { AppShell, Alert, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../components/header/Header";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { MenuTabs } from "./components/navbar/MenuTabs";
import { IconExclamationCircle, IconLogin } from "@tabler/icons-react";
import { useErrorStore } from "../stores/spotify/errorStore";
import { HeaderHero } from "./components/main/header/Header";
import { TableTracks } from "./components/main/tableTracks/TableTracks";
import { useNavbarStore } from "../stores/spotify/closeNavbarStore";

export default function Spotify() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const errorState = useErrorStore((state) => state.message);
  const authError = errorState.includes("You should re-authenticate the user");
  // сет в стор boolean для отслеживания состояния навбара
  const { toggleIsOpen } = useNavbarStore();
  useEffect(() => {
    toggleIsOpen(desktopOpened);
  }, [desktopOpened]);

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
        collapsed: { desktop: true, mobile: true },
      }}
    >
      <Header
        mobileOpened={mobileOpened}
        desktopOpened={desktopOpened}
        toggleMobile={toggleMobile}
        toggleDesktop={toggleDesktop}
      />
      <AppShell.Navbar p="xs" zIndex={1}>
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
        <HeaderHero />
        <TableTracks />
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
