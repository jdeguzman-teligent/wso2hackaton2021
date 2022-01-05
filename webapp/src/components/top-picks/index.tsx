import { useMemo, ComponentProps, useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Heading, IconButton, Flex, VStack } from "@chakra-ui/react"
import { useTable, Column } from 'react-table'
import { FaPushed } from 'react-icons/fa';

import { Image } from 'components/image';
import { topPicks } from './picks-data';
import { Pick } from 'types/pick';
import { brandRing } from "src/utils/brandRing";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/state/reducers';
import { Bill } from 'src/interfaces';
import formatDate from './../../utils/formatDate';
import { setSelectedBill } from 'src/state/redux/ducks/bill';


const HeaderCell = ({ value }: { value: string }) => (
  <Heading size="xs" textTransform="none" color="gray.light">{value}</Heading>
)

export const TopPicks = (props: ComponentProps<typeof VStack>) => {

  const dispatch = useDispatch();
  
  const bills = useSelector((state: RootState) => state.bill);
  const {payload} = bills;

  const data = useMemo(() => payload , [bills]);

  const columns = useMemo<Column<Bill>[]>(() => [{
    accessor: 'reading',
    width: '100px',
    Cell: () => (
      <VStack
        alignItems="flex-start"
        justifyContent="center"
      >
        <Image
          src='/images/customer.png'
          width="56px"
          height="56px"
          minWidth="56px"
          minHeight="56px"
          rounded="xl"
          objectFit="cover"
          quality="75"
        />
      </VStack>
    ),
  }, {
    Header: () => <HeaderCell value="Meter ID" />,
    accessor: 'meterid',
  }, {
    Header: () => <HeaderCell value="kWH" />,
    accessor: 'consumedkw',
    width: '40px',
  }, {
    Header: () => <HeaderCell value="Previous" />,
    accessor: 'previous',
  }, {
    Header: () => <HeaderCell value="Amount Due" />,
    accessor: 'amountdue',
  }, {
    Header: () => <HeaderCell value="Due Date" />,
    accessor: 'duedate',
  }, {
    Header: () => <HeaderCell value="Pay" />,
    accessor: '_id',
    id: '_id',
    width: '40px',
    Cell: () => (
      <IconButton
        icon={<FaPushed />}
        aria-label="Pay Bill"
        rounded="full"
        {...brandRing}
      />
    ),
  }], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <VStack align="flex-start" height="full" {...props}>
      <Heading color='gray.light' size='md' >Billing Statements</Heading>
      <Flex overflowY="auto" width="full">
        <Table {...getTableProps()} position="relative">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th width={column.width} {...column.getHeaderProps()} borderBottom={0} position="sticky" zIndex="banner" top={0} bg="black">
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  {...row.getRowProps()}
                  transition="ease-out"
                  transitionProperty="background"
                  transitionDuration="normal"
                  _hover={{
                    background: 'gray.light',
                    cursor: 'pointer',
                  }}
                  onClick={() => { 
                    //console.log(row); 
                    dispatch(setSelectedBill(row.values as Bill));
                  }}
                >
                  {row.cells.map((cell) => {

                    if (cell.column.id === 'duedate')  {
                      return (
                        <Td {...cell.getCellProps()} py={2} borderBottom={0} paddingInlineEnd={0} minWidth={cell.column.width}>
                          { formatDate(cell.value) }
                        </Td>
                      ) 
                    }

                    return (
                      <Td {...cell.getCellProps()} py={2} borderBottom={0} paddingInlineEnd={0} minWidth={cell.column.width}>
                        {cell.render("Cell")}
                      </Td>
                    )   

                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Flex>
    </VStack>
  )
};
