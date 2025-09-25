'use client';
import { useState } from 'react';

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
import { Checkbox } from '../ui/checkbox';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { AlertCircleIcon, Pencil, Trash2Icon } from 'lucide-react';

import {
  useCreateRecruitmentStep,
  useEditRecruitmentStep,
  useDeleteRecruitmentStep,
} from '@/lib/queries/recruitment-steps';
import { useRecruitmentStepStore } from '@/stores/useRecruitmentStepStore';

const warning = (
  <Alert className='mt-8' variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>
      Please be aware! 
    </AlertTitle>
    <AlertDescription>
      <p>Candidates can see all the details about recruitment steps when checking application status. Don't put any sensitive information there. </p>
    </AlertDescription>
  </Alert>
);

export const DialogCreateRecruitmentStep = () => {
  const [open, setOpen] = useState(false);
  const {
    name,
    description,
    requiresInterview,
    setName,
    setDescription,
    setRequiresInterview,
    reset,
  } = useRecruitmentStepStore();
  const { mutate, isPending } = useCreateRecruitmentStep();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        data: {
          name,
          description,
          requiresInterview,
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
          <DialogHeader className="mb-8">
            <DialogTitle>Create recruitment step</DialogTitle>
            <DialogDescription>
              Create new recruitment step. Click save when you&apos;re done.
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
            <div className="flex gap-3">
              <Label htmlFor="requires-interview">Requires interview</Label>
              <Checkbox
                name=""
                checked={requiresInterview}
                onCheckedChange={() => setRequiresInterview(!requiresInterview)}
              />
            </div>
          </div>
          {warning}
          <DialogFooter className="mt-8">
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

export const DialogEditRecruitmentStep = ({ rs }) => {
const [open, setOpen] = useState(false);
  const {
    name,
    description,
    requiresInterview,
    setName,
    setDescription,
    setRequiresInterview,
    setRecruitmentStep,
    reset,
  } = useRecruitmentStepStore();
  const { mutate, isPending } = useEditRecruitmentStep();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        id: rs.id,
        data: {
          name,
          description,
          requiresInterview,
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
        setRecruitmentStep(rs)
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
          <DialogHeader className="mb-8">
            <DialogTitle>Create recruitment step</DialogTitle>
            <DialogDescription>
              Create new recruitment step. Click save when you&apos;re done.
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
            <div className="flex gap-3">
              <Label htmlFor="requires-interview">Requires interview</Label>
              <Checkbox
                name=""
                checked={requiresInterview}
                onCheckedChange={() => setRequiresInterview(!requiresInterview)}
              />
            </div>
          </div>
          {warning}
          <DialogFooter className="mt-8">
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

export const DialogDeleteRecruitmentStep = ({ rs }) => {
  const { mutate, isPending } = useDeleteRecruitmentStep();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      id: rs.id,
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
            <DialogTitle className='mb-2'>Delete recruitment step</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete recruitment step:{' '}
              <strong>{rs.name}</strong>
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
