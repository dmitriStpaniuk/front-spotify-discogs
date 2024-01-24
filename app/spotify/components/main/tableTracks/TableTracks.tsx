import {
  ScrollArea,
  TextInput,
  rem,
  Table,
  Center,
  Group,
  UnstyledButton,
  Text,
  keys,
  Avatar,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import React, { useState } from "react";
import classes from "./Table.module.css";
import {
  useShowLikedTracksStore,
  useShowPlaylistStore,
} from "@/app/stores/spotify/playlistsStore";
import { userLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";

interface RowData {
  Artist: string;
  Album: string;
  "Date Added": string;
  Duration: string;
}
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}
function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
export const TableTracks = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { tracks } = useShowLikedTracksStore();
  const { playlistTracks } = useShowPlaylistStore();
  // const [sortedData, setSortedData] = useState(data);

  const formattedDate = (date: string) => {
    let fDate = new Date(date);
    let options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let formattedDate = fDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const formattedTime = (time:number) => {
    let milliseconds = time;
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    if (seconds.length == 1) {
      seconds = "0" + seconds;
  }
    return(minutes + ":" + seconds);
  };

  const data = tracks.map((track) => {
    return {
      Artist: track.track.artists[0].name,
      Album: track.track.album.name,
      "Date Added": formattedDate(track.added_at),
      Duration: formattedTime(track.track.duration_ms),
      image: track.track.album.images[2].url,
      tarckName: track.track.name,
    };
  });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    // setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };
  const rows = data.map((row) => (
    <Table.Tr key={row.Artist}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={row.image} radius={5} />
          <div>
            <Text fz="sm" fw={500}>
              {row.tarckName}
            </Text>
            <Text fz="xs" c="dimmed">
              {row.Artist}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{row.Album}</Table.Td>
      <Table.Td>{row["Date Added"]}</Table.Td>
      <Table.Td>{row.Duration}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        // value={search}
        // onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        // miw={700}
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "Artist"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Artist")}
            >
              Artist
            </Th>
            <Th
              sorted={sortBy === "Album"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Album")}
            >
              Album
            </Th>
            <Th
              sorted={sortBy === "Date Added"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Date Added")}
            >
              Date Added
            </Th>
            <Th
              sorted={sortBy === "Duration"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Duration")}
            >
              Duration
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};
