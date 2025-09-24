'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateContracType, useEditContractType, useDeleteContractType } from '@/lib/queries/contract-type';

import { useContractTypeStore } from '@/stores/useContractTypeStore';
import { Pencil, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export const DialogCreateContractType = () => {
  const [open, setOpen] = useState(false);
  const { name, description, setName, setDescription, reset } = useContractTypeStore();
  const { mutate, isPending } = useCreateContracType();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-8'>
            <DialogTitle>Create contract type</DialogTitle>
            <DialogDescription>
              Create new location. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Textarea
                id="username-1"
                name="username"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className='mt-8'>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const DialogEditContractType = ({ ct }) => {
  const [ open, setOpen ] = useState(false);
  const { name, description, setName, setDescription, setContractType, reset } = useContractTypeStore();
  const { mutate, isPending } = useEditContractType();

  const handleSubmit = (e) => {

    console.log(ct.id)

    e.preventDefault();
    mutate(
      {
        id: ct.id,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setContractType(ct)
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size='icon'>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-8'>
            <DialogTitle>Edit contract type</DialogTitle>
            <DialogDescription>
              Make changes to contract type details here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Textarea
                id="username-1"
                name="username"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className='mt-8'>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const DialogDeleteContractType = ({ ct }) => {
  const { mutate, isPending } = useDeleteContractType();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      id: ct.id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size='icon'>
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle className='mb-2'>Delete contract type</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete contract type:{' '}
              <strong>{ct.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant='destructive' disabled={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
