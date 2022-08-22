import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";
import { store } from "redux/store";

function unique(a: any) {
  return Array.from(new Set(a));
}

export function GenerateImport() {
  const comps = [...basic, ...antdItem];
  const data = store.getState().StateReducer.stateNode.children;
  const DataObj: any = [...data];
  var arr = [];
  var au: any;
  for (var i = 0; i < DataObj.length; i++) {
    var type = DataObj[i]["type"];
    // eslint-disable-next-line no-loop-func
    const dropObj = comps.find((value) => {
      return value.type === type;
    });
    var isantd = dropObj?.module;
    if (isantd === "antd") {
      // eslint-disable-next-line no-useless-concat
      if (type === "Radio.Group") {
        arr.push("Radio");
      } else {
        arr.push(type);
      }
    }
    au = unique(arr);
  }
  return au;
}
