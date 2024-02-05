import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import { useNavbarStore } from "@/app/stores/spotify/closeNavbarStore";
import {
  Table,
  UnstyledButton,
  Group,
  Center,
  rem,
  keys,
  Avatar,
  TextInput,
  Text,
} from "@mantine/core";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconSearch,
  IconClock,
  IconHash,
} from "@tabler/icons-react";
import { formattedDate, formattedTime } from "@/app/lib/formatted";
import { useUserLikedSongsStore } from "@/app/stores/spotify/currentUserLikedSongs";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/app/spotify/loading";

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
          <Center>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}
function NonSortableTh({ children }: { children: React.ReactNode }) {
  return (
    <Table.Th>
      <Text fw={500} fz="sm">
        {children}
      </Text>
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
  const { total } = useUserLikedSongsStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { items } = useUserLikedSongsStore();
  // const [sortedData, setSortedData] = useState(data);
  // состояние навбара
  const { isOpen } = useNavbarStore();
  const { fetchAllUserLikedSongs } = useUserLikedSongsStore();
  const { playlistName } = useUserLikedSongsStore();

  const data = items.map((track) => {
    return {
      artist: track.track.artists[0].name,
      album: track.track.album.name,
      dateAdded: formattedDate(track.added_at),
      duration: formattedTime(track.track.duration_ms),
      image: track.track.album.images[2].url,
      tarckName: track.track.name,
      id: track.track.id,
    };
  });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    // setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };
  const handleClick = (id: string) => {
    console.log(id);
  };

  const rows = data.map((row, index) => (
    <Table.Tr
      key={row.id}
      className={classes.tableTr}
      onClick={() => handleClick(row.id)}
      // ref={index === data.length - 1 ? observerRef : null}
    >
      <Table.Td w={15} pl={20}>
        {index + 1}
      </Table.Td>
      <Table.Td>
        <Group gap="sm" wrap="nowrap">
          <Avatar size={40} src={row.image} radius={5} />
          <div>
            <Text
              fz="sm"
              fw={500}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 270,
              }}
            >
              {row.tarckName}
            </Text>
            <Text fz="xs" c="dimmed">
              {row.artist}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 160,
        }}
      >
        {row.album}
      </Table.Td>
      {!isOpen && <Table.Td>{row["dateAdded"]}</Table.Td>}
      <Table.Td>{row.duration}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {playlistName === "LikedPlaylist" && (
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
          />
          <InfiniteScroll
            pullDownToRefreshThreshold={50}
            scrollableTarget="scrollableDiv"
            dataLength={items.length}
            next={() => {
              // Здесь вызывается функция для загрузки следующей порции данных
              fetchAllUserLikedSongs({ sdk });
            }}
            hasMore={items.length < total}
            loader={
              <Loading/>
            }
            // useWindow={false}
          >
            <Table horizontalSpacing="md" verticalSpacing="xs">
              <Table.Tbody>
                <Table.Tr>
                  <NonSortableTh>
                    <IconHash size={15} />
                  </NonSortableTh>
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
                  {!isOpen && (
                    <Th
                      sorted={sortBy === "Date Added"}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting("Date Added")}
                    >
                      Date Added
                    </Th>
                  )}
                  <Th
                    sorted={sortBy === "Duration"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("Duration")}
                  >
                    <IconClock size={15} />
                  </Th>
                </Table.Tr>
              </Table.Tbody>

              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};
