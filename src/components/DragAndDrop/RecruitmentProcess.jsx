'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useRecruitmentSteps } from '@/lib/queries/recruitment-steps'; 
import { useRecruitmentProcessStore } from '@/stores/useRecruitmentProcessStore';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ContactRound } from 'lucide-react';

// Reorder items within a list
const reorder = (list, startIndex, endIndex) => {
  // const result = Array.from(list);
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

// Move item between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  const [removed] = source.splice(droppableSource.index, 1);
  destination.splice(droppableDestination.index, 0, removed);

  return {
    [droppableSource.droppableId]: source,
    [droppableDestination.droppableId]: destination,
  };
};

export const CreateRecruitmentProcess = ({ onValueChange }) => {
  const [ steps, setSteps ] = useState({ available: [], used: [] });
  
  // const { steps, setSteps } = useRecruitmentProcessStore()
  const { data: recruitmentSteps, isLoading, error } = useRecruitmentSteps();

  useEffect(() => {
    if (recruitmentSteps) {
      // console.log(recruitmentSteps.data)
      setSteps({
        available: recruitmentSteps.data,
        used: [],
      });
      onValueChange(steps);
    }
  }, [recruitmentSteps]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder in same list
      const items = reorder(
        steps[source.droppableId],
        source.index,
        destination.index
      );
      setSteps((prev) => ({ ...prev, [source.droppableId]: items }));
      onValueChange(steps)  //  Change global state from parent component
    } else {
      // Move between lists
      const result = move(
        steps[source.droppableId],
        steps[destination.droppableId],
        source,
        destination
      );
      setSteps((prev) => ({ ...prev, ...result }));
      onValueChange(steps)  //  Change global state from parent component
    }
  };

  const draggableContent = (item) => (
    <>
      <p className=''>{item.name}</p>
      <span className='text-sm text-muted-foreground'>{item.description}</span>
      {item.requiresInterview && (
        <div className='absolute top-2 right-2'>
          <Tooltip>
            <TooltipTrigger>
              <div className='p-1 rounded-full bg-red-500'>
                <ContactRound name='Requires interview icon' color='#fff' size={18} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>This step in process requires interview with applicant</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  )

  const renderList = (listId) => (
    <Droppable
      droppableId={listId}
      renderClone={(provided, snapshot, rubric) => {
        const item = steps[rubric.source.droppableId][rubric.source.index];

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}  
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
                  className={`p-2 mb-2 rounded shadow-sm cursor-move backdrop-blur-xs ${
                    snapshot.isDragging
                      ? 'bg-card/50 border border-primary'
                      : 'bg-card border'
                  }`}
          >
            {draggableContent(item)}
          </div>
        );
      }}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 overflow-y-auto p-4 border rounded-lg ${
            snapshot.isDraggingOver
              ? 'border-dashed border-primary'
              : 'border'
          }`}
        >
          {steps[listId].map((item, index) => (
            <Draggable
              key={`${item.id}`}
              draggableId={`${item.id}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-2 mb-2 rounded shadow-sm cursor-move relative ${
                    snapshot.isDragging
                      ? 'bg-card/50 border border-primary'
                      : 'bg-card border'
                  }`}
                >
                  {draggableContent(item)}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="flex flex-1 max-h-[324px] gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {renderList('available')}
        {renderList('used')}
      </DragDropContext>
    </div>
  );
};
