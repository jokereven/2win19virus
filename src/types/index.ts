export enum COMPONENT_TYPE {
  //add
  DIV = "div",
  H1 = "h1",
  P = "p",
  BUTTON = "button",
  TEXT = "text",
  SELECT = "select",
  IMAGE = "image",
  SPAN = "span",
  LINK = "link",
  TEXT_DROPED = "text-droped",
  H1_DROPPED = "h1-dropped",

  VIDEO = "video",
  AUDIO = "audio",
  CARD = "card",
  FORM = "form",
}

export enum RIGHT_PANEL_TYPE {
  NONE = "none",
  TEXT = "text",
  VIDEO = "video",
  IMAGE = "image",
  FORM = "form",
  CARD = "card",
}

export type ElementType = {
  id: string;
  type: string;
  [prop: string]: any;
};

// 定义可拖拽组件的属性
export interface FieldNode {
  type: string;
  module?: string;
  props: Record<string, any>;
}
