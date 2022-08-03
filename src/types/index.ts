export enum COMPONENT_TYPE {
  TEXT = "text",
  VIDEO = "video",
  IMAGE = "image",
  AUDIO = "audio",
  CARD = "card",
  FORM = "form",
  TEXT_DROPED = "text-droped",
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
