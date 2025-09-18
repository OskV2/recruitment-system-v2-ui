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
import { Pencil, Trash2Icon } from 'lucide-react';

export const DialogCreateLocation = () => {}

export const DialogEditLocation = ({ location }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"><Pencil /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit location</DialogTitle>
            <DialogDescription>
              Make changes to office location details here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={location.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Textarea id="username-1" name="username" defaultValue={location.description} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export const DialogDeleteLocation = ({ location }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"><Trash2Icon /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete location</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete location: <strong>{location.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}