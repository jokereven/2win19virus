import { store } from "redux/store";

export function undoSave() {
  const undoArr = store.getState().StateReducer.undo_arr;
  var state = store.getState().StateReducer.stateNode.children;
  undoArr.push(state);
  console.log(undoArr.length, undoArr);
}
