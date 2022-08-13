import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";
import { store } from "redux/store";

export function GenerateImportTable() {
  const comps = [...basic, ...antdItem];
  const data = store.getState().StateReducer.stateNode.children;
  const DataObj: any = [...data];
  for (var i = 0; i < DataObj.length; i++) {
    var type = DataObj[i]["type"];
    // eslint-disable-next-line no-loop-func
    const dropObj = comps.find((value) => {
      return value.type === type;
    });
    var isantd = dropObj?.module;
    if (isantd === "antd") {
      if (type === "Table") {
        var column = dropObj?.props.other.columns;
        var dsc = dropObj?.props.other.dataSource;
        var c = JSON.stringify(column);
        var d = JSON.stringify(dsc);
        var str = `  const columns = ${c}
  const dataSource = ${d}`;
        return str;
      }
    }
  }
}
