import { Result } from "antd";
import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";

//通过type查找对应props
export function findPropsByType(type: string): Object | undefined {
  const comps = [...basic, ...antdItem];

  const result = comps.find((value) => {
    return value.type === type;
  });
  if (result) {
    return result["props"];
  }
  return;
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
