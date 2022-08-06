import React from "react";
import { useDrag } from "react-dnd";
import "./style.css";
// import { TextComponentWrapper } from "./style";

export default function DragItem({ data }: { data: any }) {
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
