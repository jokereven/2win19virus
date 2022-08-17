import component from "dataClass/componentClass";
import { stateConstantas } from "../constantas";

export function search(comp: component, key: number): component | null {
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

function swapDOM(
  children: Array<component | string>,
  place1: number,
  place2: number
) {
  var child1 = children[place1];
  var child2 = children[place2];
  children[place1] = child2;
  children[place2] = child1;
}

function upDOM(
  stateNode: component,
  data: {
    key: number;
  }
) {
  var optDOM = search(stateNode, data.key);
  if (optDOM && optDOM.parent) {
    var index = optDOM.parent.children.indexOf(optDOM);
    if (index === 0) {
      return;
    } else {
      swapDOM(optDOM.parent.children, index, index - 1);
    }
  }
}

function downDOM(
  stateNode: component,
  data: {
    key: number;
  }
) {
  var optDOM = search(stateNode, data.key);
  if (optDOM && optDOM.parent) {
    var index = optDOM.parent.children.indexOf(optDOM);
    if (index === optDOM.parent.children.length) {
      return;
    } else {
      swapDOM(optDOM.parent.children, index, index + 1);
    }
  }
}

function insert(data: {
  optDOM: component;
  newDOM: component;
  method: "after" | "before";
}) {
  var { optDOM, newDOM, method } = data;
  if (optDOM.parent != null) {
    newDOM.parent = optDOM.parent;
    var preArr: Array<component | string>;
    var aftArr: Array<component | string>;
    var children = optDOM.parent.children;
    if (method === "after") {
      preArr = children.slice(0, children.indexOf(optDOM) + 1);
      aftArr = children.slice(children.indexOf(optDOM) + 1);
    } else {
      preArr = children.slice(0, children.indexOf(optDOM));
      aftArr = children.slice(children.indexOf(optDOM));
    }
    optDOM.parent.children = [...preArr, newDOM, ...aftArr];
  }
}

const StateReducer = (
  state: {
    stateNode: component;
    targetDOM: component | null;
    mouseMove: {
      optDOM: component | null;
      method: "after" | "before";
    };
    optTop: number;
    optLeft: number;
    generate_matlab: string;
    undo_arr: any[];
    undo_status: string;
  } = {
    stateNode: new component(
      "div",
      {},
      {
        onClick: () => {
          console.log("new component");
        },
      },
      []
    ),
    targetDOM: null,
    mouseMove: {
      optDOM: null,
      method: "after",
    },
    optLeft: 0,
    optTop: 0,
    generate_matlab: "",
    undo_arr: [],
    undo_status: "",
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
      action.data.place = state.targetDOM?.key || state.stateNode.key;
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
    case stateConstantas.UPDOM:
      upDOM(newState.stateNode, action.data);
      return newState;
    case stateConstantas.DOWNDOM:
      downDOM(newState.stateNode, action.data);
      return newState;
    case stateConstantas.INSERT:
      insert(action.data);
      newState.mouseMove.optDOM = null;
      return newState;
    case stateConstantas.UPDATEMOUSEMOVE:
      newState.mouseMove = action.data;
      return newState;
    case stateConstantas.UPDATETARGETDOM:
      return newState;
    default:
      return newState;
  }
};

export default StateReducer;
