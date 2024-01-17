import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { Playlist } from "./PlaylistTabMenu";
// import { SavedUserAlbums } from "./AlbumTabsMenu";
import { Artist } from "./ArtistTabsMenu";

const data = [
  { title: "Playlist", colore: "green" },
  { title: "Album", colore: "green" },
  { title: "Artist", colore: "green" },
];

export const MenuTabs = () => {
  // const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Playlist");
  const handleTabClick = (tabTitle: string) => {
    setSelectedTab(tabTitle);
  };
  return (
    <Tabs
    >
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
      {selectedTab === "Playlist" && <Playlist />}
      {/* {selectedTab === "Album" && <SavedUserAlbums />} */}
      {/* {selectedTab === "Artist" && <Artist />} */}
    </Tabs>
  );
};
