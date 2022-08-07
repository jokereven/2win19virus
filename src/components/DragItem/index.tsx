import React from "react";
import { useDrag } from "react-dnd";
import { FieldNode } from "types";
import "./style.css";
interface Props {
  data: FieldNode;
}

export default function DragItem({ data }: Props) {
  const [, drag] = useDrag(() => ({
    type: data.type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="componentWrapper" ref={drag}>
      {data.type}
    </div>
  );
}
