import { Group, ActionIcon, rem, Menu } from "@mantine/core";
import { nanoid } from "nanoid";
import {
  IconEdit,
  IconDots,
  IconPlaylistAdd,
  IconDownload,
  IconTrash,
  IconPlus,
  IconRadar2,
  IconX,
} from "@tabler/icons-react";
import React from "react";

type TypeData = "playlist" | "album" | "artist";
interface DropdownMenuProps {
  typeData: TypeData;
 }

const playlistData = [
  {
    icon: (
      <IconPlaylistAdd
        style={{ width: rem(16), height: rem(16) }}
        stroke={1.5}
      />
    ),
    message: "Create playlist",
    color: "",
  },
  {
    icon: <IconEdit style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
    message: "Edit details",
    color: "",
  },
  {
    icon: (
      <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    message: "Download",
    color: "",
  },
  {
    icon: (
      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    message: "Delelte",
    color: "red",
  },
];
const albumData = [
  {
    icon: (
      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    message: "Remove from Your Library",
    color: "red",
  },
  {
    icon: <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
    message: "Add to playlist",
    color: "",
  },
  {
    icon: (
      <IconRadar2 style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    message: "Go to artist radio",
    color: "",
  },
];
const artistData = [
  {
  icon: (
    <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  ),
  message: "Unfollow",
  color: "red",
},
  {
    icon: (
      <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    message: "Go to artist radio",
    color: "",
},
]

const dataMap = {
  playlist: playlistData,
  album: albumData,
  artist: artistData,
 };

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ typeData }) => {
  return (
    <Group gap={0} justify="flex-end">
      <Menu
        transitionProps={{ transition: "pop" }}
        withArrow
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDots
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {dataMap[typeData].map((menuItem) => (
            <Menu.Item
              key={nanoid()}
              leftSection={menuItem.icon}
              color={menuItem.color}
            >
              {menuItem.message}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
