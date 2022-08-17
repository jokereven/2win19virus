import { store } from "redux/store";

var undoArr = store.getState().StateReducer.undo_arr;
export function undoSave(type: string) {
  var state = [...store.getState().StateReducer.stateNode.children];
  var status = store.getState().StateReducer.undo_status;
  if (type === "add") {
    undoArr.push(state);
    status = "add";
  } else if (type === "delete") {
    undoArr.push(state);
    status = "delete";
  } else {
  }
  store.getState().StateReducer.undo_status = status;
  console.log(undoArr);
}
