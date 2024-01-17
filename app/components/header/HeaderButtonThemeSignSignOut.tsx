import { Group, NavLink, Avatar } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconLogout, IconLogin } from "@tabler/icons-react";
import { useSession, signOut, signIn } from "next-auth/react";
import React from "react";
import { ColorScheme } from "./ColorScheme";

export const HeaderButtonThemeSignSignOut = () => {
  const { data: session } = useSession();
  const sessionPhotoUser = session?.user?.image;
  return (
    <>
      <Group justify="space-between" style={{ flex: 1 }}>
        <MantineLogo size={30} />
        <Group wrap="nowrap" ml="xl" gap={0} visibleFrom="xs">
          <ColorScheme />
          {session && (
            <NavLink
              href="/profile"
              label="Profile"
              leftSection={<Avatar src={sessionPhotoUser} size="1.3rem" />}
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
              onClick={() => signIn("spotify")}
              label="SignIn"
              leftSection={<IconLogin stroke={1.5} size="1.3rem" />}
            />
          )}
        </Group>
      </Group>
    </>
  );
};
