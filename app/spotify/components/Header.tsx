import { AppShell, Group, Burger, NavLink } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconUser, IconLogout, IconLogin } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import React, { Suspense } from "react";
import { ColorScheme } from "./ColorScheme";

interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}) => {
  const { data: session } = useSession();
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
        <Group justify="space-between" style={{ flex: 1 }}>
          <MantineLogo size={30} />
          <Group wrap="nowrap" ml="xl" gap={0} visibleFrom="sm">
            <ColorScheme />
            {session && (
              <NavLink
                href="/profile"
                label="Profile"
                leftSection={<IconUser stroke={1.5} size="1.3rem" />}
              />
            )}
            {session ? (
              <NavLink
                onClick={() => signOut({ callbackUrl: "/" })}
                label="SignOut"
                leftSection={<IconLogout stroke={1.5} size="1.3rem" />}
              />
            ) : (
              <NavLink
                href="/api/auth/signin"
                label="SignIn"
                leftSection={<IconLogin stroke={1.5} size="1.3rem" />}
              />
            )}
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
};
