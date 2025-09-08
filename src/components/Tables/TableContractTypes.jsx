'use client'

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
import { getAllContractTypes, createContractType } from '@/api/contract-type';

const TableContractTypes = () => {
  const queryClient = useQueryClient();

  //  Fetch locations
  const {
    data: contractTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contract-type'],
    queryFn: getAllContractTypes,
  });

  console.log(contractTypes)

  //  ! COME BACK TO THIS
  // Mutation for adding new user
  const mutation = useMutation({
    mutationFn: createContractType,
    onSuccess: () => {
      // Refetch users list after creating
      queryClient.invalidateQueries({ queryKey: ['contract-type'] });
    },
  });

  //  ! ALSO LOADING NEEDS TO BE FIXED
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Table>
      <TableCaption>All contracts offered by company.</TableCaption>
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
        {contractTypes.data.map((data) => (
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

export default TableContractTypes;
