import React, { ReactElement } from "react";
import { FieldNode } from "types";
import DragItem from "./DragItem";

interface Props {
  data: FieldNode[];
}

export default function DragPanel({ data }: Props): ReactElement {
  return (
    <>
      {data.map((d: FieldNode) => (
        <DragItem key={d.type} data={d} />
      ))}
    </>
  );
}
