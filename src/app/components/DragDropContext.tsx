"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { DayColumn } from "./DayColumn";
import { initialData } from "../data/fakeData";

export const DragDropContext = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setData((prevState) => {
      const tasks = [...prevState.tasks];
      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
      const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

      if (activeTaskIndex !== -1 && overTaskIndex !== -1 && tasks[activeTaskIndex].day === tasks[overTaskIndex].day) {
        const dayTasks = tasks.filter((task) => task.day === tasks[activeTaskIndex].day);
        const reorderedDayTasks = arrayMove(dayTasks, activeTaskIndex, overTaskIndex);

        return {
          ...prevState,
          tasks: [
            ...tasks.filter((task) => task.day !== tasks[activeTaskIndex].day),
            ...reorderedDayTasks,
          ],
        };
      }


      tasks[activeTaskIndex].day = over.id as string;
      return { ...prevState, tasks };
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        {data.days.map((day) => (
          <SortableContext key={day} items={data.tasks.filter((task) => task.day === day).map((task) => task.id)} strategy={verticalListSortingStrategy}>
            <DayColumn
              day={day}
              tasks={data.tasks.filter((task) => task.day === day)}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};
