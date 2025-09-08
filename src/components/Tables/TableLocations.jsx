'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2Icon } from 'lucide-react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllLocations, createLocation } from '@/api/location';

const TableLocations = () => {
  const queryClient = useQueryClient();

  //  Fetch locations
  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location'],
    queryFn: getAllLocations,
  });

  //  ! COME BACK TO THIS
  // Mutation for adding new user
  const mutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      // Refetch users list after creating
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
  });

  //  ! ALSO LOADING NEEDS TO BE IMPROVED BECAUSE NOW ITS JUST P
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Table>
      <TableCaption>All office locations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.data.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>{data.createdAt}</TableCell>
            <TableCell>
              <div className="flex">
                <Pencil />
                <Trash2Icon />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
};

export default TableLocations;
