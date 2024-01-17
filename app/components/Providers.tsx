"use client";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import type { Session } from "next-auth";

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </SessionProvider>
  );
};
