import component from "dataClass/componentClass";
import { ElementType } from "../types/index";
export default function addComponent(
  parent: component,
  compInfo: ElementType
): component {
  var newComp = new component(
    compInfo.type,
    compInfo.props.style || {},
    compInfo.props.event || {},
    [],
    compInfo.blink || false,
    compInfo.props.other || {}
  );
  newComp.parent = parent;

  var children = compInfo.props?.children || undefined;
  if (children && children instanceof Array) {
    children.forEach((item: ElementType | string) => {
      if (typeof item === "string") {
        newComp.children.push(item);
      } else {
        var newDOM = addComponent(newComp, item);
        newComp.children.push(newDOM);
      }
    });
  }
  return newComp;
}
