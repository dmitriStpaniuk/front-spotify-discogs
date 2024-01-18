import React, { useState } from "react";
import { Tabs, LoadingOverlay } from "@mantine/core";
import { CurrentUserPlaylists } from "./TabMenuPlaylist";
import { Artist } from "./TabsMenuArtist";
import { SavedUserAlbums } from "./TabsMenuAlbum";
import { useDisclosure } from '@mantine/hooks';

const data = [
  { title: "Playlist", colore: "green" },
  { title: "Album", colore: "green" },
  { title: "Artist", colore: "green" },
];

export const MenuTabs = () => {

  const [selectedTab, setSelectedTab] = useState("Playlist");
  const handleTabClick = (tabTitle: string) => {
    setSelectedTab(tabTitle);
  };

  return (
    <Tabs>
      <Tabs.List defaultValue="Playlist">
        {data.map((item) => {
          return (
            <Tabs.Tab
              key={item.title}
              value={item.title}
              color={item.colore}
              onClick={() => handleTabClick(item.title)}
            >
              {item.title}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      {selectedTab === "Playlist" && <CurrentUserPlaylists />}
      {selectedTab === "Album" && <SavedUserAlbums />}
      {/* {selectedTab === "Artist" && <Artist />} */}
    </Tabs>
  );
};
