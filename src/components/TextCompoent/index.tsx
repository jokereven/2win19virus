import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT_TYPE } from "../../types";
import { TextComponentWrapper } from "./style";

export const TextComponent: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: COMPONENT_TYPE.TEXT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <TextComponentWrapper ref={drag}>text</TextComponentWrapper>;
};
