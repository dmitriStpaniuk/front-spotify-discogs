import { AppShell, Group, Burger, NavLink, Avatar } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconLogout, IconLogin } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { ColorScheme } from "./ColorScheme";
import { HeaderButtonThemeSignSignOut } from "./HeaderButtonThemeSignSignOut";

interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  sessionPhotoUser?: string;
}

export const Header: React.FC<HeaderProps> = ({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}) => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <HeaderButtonThemeSignSignOut />
      </Group>
    </AppShell.Header>
  );
};
