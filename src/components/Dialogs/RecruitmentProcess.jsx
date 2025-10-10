'use client';
import { useState, useEffect } from 'react';

// UI
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
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"
import { StethoscopeIcon, Trash2Icon } from 'lucide-react';
import { CreateRecruitmentProcess } from '../DragAndDrop/RecruitmentProcess';

//  Queries
import {
  useCreateRecruitmentProcess,
  useDeleteRecruitmentProcess,
} from '@/lib/queries/recruitment-process';

//  Stores
import { useRecruitmentProcessStore } from '@/stores/useRecruitmentProcessStore';

const formSteps = [1, 2, 3];

export const DialogCreateRecruitmentProcess = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { name, description, steps, setName, setDescription, setSteps, reset } = useRecruitmentProcessStore();

  const { mutate, isPending } = useCreateRecruitmentProcess();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        //  Data needs to be adjusted according to postman
        data: {
          name: name,
          description: description,
          steps: steps.used,
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

  const prevStepButton = (
    <Button
      variant="outline"
      onClick={() => setCurrentStep((prev) => prev - 1)}
      disabled={currentStep === 1}
    >
      Previous
    </Button>
  );

  const stepConditions = {
    1: !name || !description,
    2: steps.used.length < 3,
  };

  const nextStepButton = (
    <Button
      variant="outline"
      onClick={() => setCurrentStep((prev) => prev + 1)}
      disabled={stepConditions[currentStep]}
    >
      Next
    </Button>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          reset();
          setCurrentStep(1)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create recruitment process</DialogTitle>
          <DialogDescription>
            Create new recruitment process. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* <div className="w-3/5"> */}
          <Stepper
            className="mb-2"
            value={currentStep}
            onValueChange={setCurrentStep}
          >
            {formSteps.map((step) => (
              <StepperItem key={step} step={step} className="not-last:flex-1">
                <StepperTrigger>
                  <StepperIndicator />
                </StepperTrigger>
                {step < formSteps.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>
        {/* </div> */}

        <form onSubmit={handleSubmit} className='h-96 flex flex-col'>
          {currentStep === 1 && (
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
          )}

          {currentStep === 2 && <CreateRecruitmentProcess onValueChange={(value) => setSteps(value)} />}

          {currentStep === 3 && (
            <div className='flex flex-row max-h-[324px]'>
              <div className="flex-1">
                <p className='mb-1'>Name</p>
                <p className='mb-3 text-muted-foreground'>{name}</p>
                <p className='mb-1'>Description</p>
                <p className='text-muted-foreground'>{description}</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <p>Steps</p>
                    <Timeline defaultValue={0}>
                      {steps.used.map(item => (
                          // <div key={item.id}>
                          //   {item.name}, {item.description}
                          // </div>

                          <TimelineItem key={item.id} step={item.id}>
                            <TimelineHeader>
                              <TimelineSeparator />
                              <TimelineTitle className="-mt-0.5">{item.name}</TimelineTitle>
                              <TimelineIndicator />
                            </TimelineHeader>
                            <TimelineContent>
                              {item.description}
                            </TimelineContent>
                          </TimelineItem>

                        ))}
                    </Timeline>
              </div>
            </div>
          )}



      {/* {items.map((item, index) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineTitle className="-mt-0.5">{item.title}</TimelineTitle>
            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent>
            {item.description}
            <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
          </TimelineContent>
        </TimelineItem>
      ))} */}



          <DialogFooter className="mt-auto">
            {currentStep === 1 && nextStepButton}

            {currentStep === 2 && (
              <>
                {prevStepButton}
                {nextStepButton}
              </>
            )}

            {currentStep === 3 && (
              <>
                {prevStepButton}
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save'}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const DialogDeleteRecruitmentProcess = ({ rp }) => {
  const { mutate, isPending } = useDeleteRecruitmentProcess();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      id: rs.id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle className="mb-2">
              Delete recruitment process
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete recruitment process:{' '}
              <strong>{rp.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
