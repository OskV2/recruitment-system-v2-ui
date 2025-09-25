'use client'

import { useState } from 'react'

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

import { DialogCreateRecruitmentStep, DialogEditRecruitmentStep, DialogDeleteRecruitmentStep } from '../Dialogs/RecruitmentSteps';

//  ----------------  Data
import { useRecruitmentSteps } from '@/lib/queries/recruitment-steps';

//  ----------------  Icons
import { ArrowUpDown } from 'lucide-react';

const TableRecruitmentSteps = () => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const { data: recruitmentSteps, isLoading, error } = useRecruitmentSteps();
  console.log(recruitmentSteps)

  // "id": 1,
  // "name": "To be done",
  // "description": "",
  // "currentStep": false,
  // "requiresInterview": false,
  // "deleted": false,
  // "createdAt": "2025-09-01T19:35:40.263Z",
  // "updatedAt": "2025-09-01T19:35:40.263Z"

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
      header: 'Name'
    },
    {
      accessorKey: 'description',
      header: 'Description'
    },
    {
      accessorKey: 'requiresInterview',
      header: 'Requires interview'
    },
    {
      accessorKey: 'createdAt',
      header: 'Created at'
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rs = row.original;

        return (
          <div className='flex gap-4'>
            <DialogEditRecruitmentStep rs={rs} />
            <DialogDeleteRecruitmentStep rs={rs} />
          </div>
        );
      },
      meta: {
        className: "w-0",
      },
    },
  ]

  const table = useReactTable({
    data: recruitmentSteps?.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <div className="flex items-center justify-between mt-6 mb-4">
        <Input
          placeholder="Filter recruitment steps"
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-4">
          {Object.keys(rowSelection).length > 0 && <Button variant='destructive'>Delete</Button>} { /* Deleting does not work for now ok? */ }
          <DialogCreateRecruitmentStep />
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
      {recruitmentSteps.length > 10 && 
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
      }

    </div>
  )
}

export default TableRecruitmentSteps