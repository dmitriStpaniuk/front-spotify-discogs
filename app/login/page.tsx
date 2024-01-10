"use client";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getProviders, signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { MantineLogo } from "@mantinex/mantine-logo";

import Loading from "./loading";
import { Playlist } from "./components/Playlist";

export default function Login() {
  const [providers, setProviders] = useState<Record<string, any> | undefined>();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect(() => {
    if (!providers) {
      getProvidersProps().then((providers) => setProviders(providers));
    }
  }, [providers]);

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
            <Group ml="xl" gap={0} visibleFrom="sm">
              {/* <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton> */}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          <Suspense fallback={<Loading />}>
            <Playlist />
          </Suspense>
        </AppShell.Navbar>
      <AppShell.Main>
        <h1 className="">Welcome to Spotify and Discogs</h1>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn("spotify", { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          ))}
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
async function getProvidersProps(): Promise<Record<string, any> | undefined> {
  const provider = await getProviders();
  if (provider) return provider;
}
