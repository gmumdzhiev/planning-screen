import React from "react";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  id: string;
  title: string;
};

export const TaskCard = ({ id, title }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded shadow cursor-pointer"
    >
      {title}
    </div>
  );
};
