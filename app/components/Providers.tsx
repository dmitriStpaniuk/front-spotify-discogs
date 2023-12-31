"use client";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </SessionProvider>
  );
};
