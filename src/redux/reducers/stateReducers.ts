import component from "dataClass/componentClass";
import { stateConstantas } from "../constantas";

function search(comp: component, key: number): component | null {
  if (key === comp.key) {
    return comp;
  }
  for (var i = 0; i < comp.children.length; i++) {
    var child: component | string = comp.children[i];
    if (child instanceof component) {
      var result: component | null = search(child, key);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}

function addDom(
  stateNode: component,
  data: {
    place: number;
    method: string;
    newDOM: component;
  }
) {
  var { place, method, newDOM } = data;

  var optDOM = search(stateNode, place);
  if (method === stateConstantas.APPENDAFTER) {
    optDOM?.children.push(newDOM);
  } else {
    optDOM?.children.unshift(newDOM);
  }
  newDOM.parent = optDOM;
}

function deleteDom(
  stateNode: component,
  data: {
    key: number;
  }
) {
  var { key } = { ...data };
  var optDOM: component | null | undefined = search(stateNode, key)?.parent;
  if (optDOM instanceof component) {
    optDOM.children = optDOM?.children.filter((item: component | string) => {
      if (item instanceof component && item.key === key) {
        return false;
      }
      return true;
    });
  }
}

function chooseDom(
  stateNode: component,
  data: {
    key: number;
  }
): component | null {
  return search(stateNode, data.key);
}

const StateReducer = (
  state: {
    stateNode: component;
    targetDOM: component | null;
  } = {
    stateNode: new component("div", {}, {}, ["测试"]),
    targetDOM: null,
  },
  action: {
    type: string;
    data: any;
  }
) => {
  var newState = { ...state };
  switch (action.type) {
    // case "ADD":
    case stateConstantas.ADDDOM:
      addDom(newState.stateNode, action.data);
      return newState;
    case stateConstantas.DELETEDOM:
      deleteDom(newState.stateNode, action.data);
      return newState;
    case stateConstantas.CHOOSEDOM:
      if (newState.targetDOM !== null) {
        newState.targetDOM.style = {};
      }
      newState.targetDOM = chooseDom(newState.stateNode, action.data);

      if (newState.targetDOM instanceof component) {
        newState.targetDOM.style = { border: "solid 1px black" };
      } else {
        newState.targetDOM = newState.stateNode;
        newState.targetDOM.style = { border: "solid 1px black" };
      }
      return newState;
    default:
      return state;
  }
};

export default StateReducer;
