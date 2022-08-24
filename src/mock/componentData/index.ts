import { ElementType } from "types";
import { IEditField } from "./type";
import antdItems from "./antdItem";
import basicItems from "./basic";
import { antdEditFields, antdEventFields } from "./antdItem";
import { basicEditFields, basicEventFields } from "./basic";

const allItems: ElementType[] = [...antdItems, ...basicItems];
export default allItems;

export const allEditFields: Record<string, IEditField[]> = {
  ...basicEditFields,
  ...antdEditFields,
};

export const allEventFields: Record<string, IEditField[]> = {
  ...basicEventFields,
  ...antdEventFields,
};
