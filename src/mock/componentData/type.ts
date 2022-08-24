export interface IEditField extends Record<string, any> {
  [x: string]: any;
  prop: string;
  name: string;
  type: string;
}

export interface IEventField {
  [x: string]: any;
  onClick?: string;
  onChange?: string;
}
