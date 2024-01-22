"use client";
import { HeaderButtonThemeSignSignOut } from "./components/header/HeaderButtonThemeSignSignOut";
import { AppShell, Group } from "@mantine/core";
import { HeroTitle } from "./components/main/HeroTitle";
import { Footer } from "./components/footer/Footer";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} >
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