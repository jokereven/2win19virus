import component from "dataClass/componentClass";
import { stateConstantas } from "../constantas";

//用来添加一个dom元素
function addDom(place: number, method: string, newDOM: component) {
  return {
    type: stateConstantas.ADDDOM,
    data: { place, method, newDOM },
  };
}

function deleteDOM(key: number) {
  return {
    type: stateConstantas.DELETEDOM,
    data: { key },
  };
}

export { addDom, deleteDOM };
