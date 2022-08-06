import React, { ReactElement } from "react";
// import { FieldNode } from '../schema/types'
import DragItem from "./DragItem";

interface Props {
  data: any;
}

export default function DragPanel({ data }: Props): ReactElement {
  return (
    <>
      {data.map((d: any) => (
        <DragItem key={d.type} data={d} />
      ))}
    </>
  );
}
