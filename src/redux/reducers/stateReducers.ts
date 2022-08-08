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
    newDOM: component | string;
  }
) {
  var { place, method, newDOM } = data;

  var optDOM = search(stateNode, place);
  if (method === stateConstantas.APPENDAFTER) {
    optDOM?.children.push(newDOM);
  } else {
    optDOM?.children.unshift(newDOM);
  }
  if (newDOM instanceof component) newDOM.parent = optDOM;
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
    optTop: number;
    optLeft: number;
  } = {
    stateNode: new component("div", {}, {}, ["测试"]),
    targetDOM: null,
    optLeft: 0,
    optTop: 0,
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
        newState.targetDOM.choose = false;
      }
      newState.targetDOM = chooseDom(newState.stateNode, action.data);
      newState.optLeft = action.data.optLeft;
      newState.optTop = action.data.optTop;
      if (newState.targetDOM instanceof component) {
        newState.targetDOM.choose = true;
      } else {
        newState.targetDOM = newState.stateNode;
      }
      return newState;
    default:
      return state;
  }
};

export default StateReducer;
