import React from "react";
import { useDrag } from "react-dnd";
import { ElementType } from "types";
import "./style.css";
interface Props {
  data: ElementType;
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
