import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";

export function undoSave(type: string) {
  var state = [...store.getState().StateReducer.stateNode.children];
  var undoArr = store.getState().StateReducer.undo_arr;
  var index = store.getState().StateReducer.undo_index;
  // 添加索引
  index++;
  var status = store.getState().StateReducer.undo_status;
  store.dispatch({
    type: stateConstantas.INDEX,
    data: {
      index,
    },
  });
  if (type === "add") {
    undoArr.push(state);
    status = "add";
  } else if (type === "delete") {
    undoArr.push(state);
    status = "delete";
  } else {
  }
  store.getState().StateReducer.undo_status = status;
}
