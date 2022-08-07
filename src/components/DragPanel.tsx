import React, { ReactElement } from "react";
import { ElementType } from "types";
import DragItem from "./DragItem";

interface Props {
  data: ElementType[];
}

export default function DragPanel({ data }: Props): ReactElement {
  return (
    <>
      {data.map((d: ElementType) => (
        <DragItem key={d.type} data={d} />
      ))}
    </>
  );
}
