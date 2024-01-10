"use client";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export const Sidebar =  () => {
  const {data: session, status} = useSession();
  return (
    <div className="text-gray-400 pt-4 pl-4 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      {session ? (
        <Button
          component={Link}
          href={"/"}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          sign out
        </Button>
      ) : (
        <Button component={Link} href="/api/auth/signin">
          sign in
        </Button>
      )}
    </div>
  );
};
