'use client'
import { Skeleton, Table, Group } from "@mantine/core";
import { useNavbarStore } from "../stores/spotify/closeNavbarStore";

export default function Loading() {
  const { isOpen } = useNavbarStore();
  // You can add any UI inside Loading, including a Skeleton.
  const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td w={15} pl={20}>
        <Skeleton height={15} width={15} />
      </Table.Td>
      <Table.Td></Table.Td>
      <Group ml={-15}>
        <Skeleton height={40} width={50} mb={5} />
        <div>
          <Skeleton height={10} width={190} mb={5} />
          <Skeleton height={10} width={190} />
        </div>
      </Group>
      {!isOpen && (
        <Table.Td>
          <Skeleton height={20} width={100} />
        </Table.Td>
      )}
      <Table.Td>
        <Skeleton height={20} width={100} />
      </Table.Td>
      <Table.Td>
        <Skeleton height={20} width={30} />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Tbody>{skeletonRows}</Table.Tbody>;
    </Table>
  );
}
