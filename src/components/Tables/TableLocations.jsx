'use client';

import * as React from 'react';

//  ----------------  Tanstack Table
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

//  ----------------  UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DialogCreateLocation, DialogEditLocation, DialogDeleteLocation } from '../Dialogs/Location';

//  ----------------  Data
import { useLocations } from '@/lib/queries/location';

//  ----------------  Icons
import { ArrowUpDown } from 'lucide-react';

const DataTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  //  Fetch locations
  const { data: locations, isLoading, error } = useLocations();

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div
            className="flex gap cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      meta: {
        className: "max-w-64 truncate",
      },
    },
    {
      accessorKey: 'createdat',
      header: 'Created at',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const location = row.original;

        return (
          <div className='flex gap-4'>
            <DialogEditLocation location={location} />
            <DialogDeleteLocation location={location} />
          </div>
        );
      },
      meta: {
        className: "w-0",
      },
    },
  ];

  const table = useReactTable({
    data: locations?.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  //  ALSO LOADING NEEDS TO BE IMPROVED BECAUSE NOW ITS JUST P
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <Input
          placeholder="Filter locations"
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-4">
          {Object.keys(rowSelection).length > 0 && <Button variant='destructive'>Delete many</Button>} { /* Deleting does not work for now ok? */ }
          <DialogCreateLocation />
        </div>
      </div>
      <div className="rounded-md my-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
