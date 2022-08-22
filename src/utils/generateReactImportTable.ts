import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";
import { store } from "redux/store";
import { ElementType } from "types";

interface IComponent {
  dropObj: ElementType;
  render: () => string;
}

abstract class AbstractComponent implements IComponent {
  dropObj: ElementType;
  abstract render(): string;
  constructor(dropObj: ElementType) {
    this.dropObj = dropObj;
  }
}

class Table extends AbstractComponent {
  render() {
    const column = this.dropObj.props.other.columns;
    const dsc = this.dropObj.props.other.dataSource;
    const c = JSON.stringify(column);
    const d = JSON.stringify(dsc);
    const str = `\nconst columns = ${c} ;const dataSource = ${d}`;
    return str;
  }
}
class Radio extends AbstractComponent {
  render() {
    console.log("options", this.dropObj);

    const options = this.dropObj.props.other.options;
    const o = JSON.stringify(options);
    const str = `\nconst options = ${o};`;
    return str;
  }
}
class Context {
  component: IComponent;
  constructor(component: IComponent) {
    this.component = component;
  }
  render(): string {
    return this.component.render();
  }
}

export function GenerateImportTableAndRadio() {
  const comps = [...basic, ...antdItem];
  const DataObj = store.getState().StateReducer.stateNode.children as any;
  // console.log("DataObj",DataObj);

  let str = "";
  for (var i = 0; i < DataObj.length; i++) {
    let type = DataObj[i]["type"];
    // console.log("type", type);
    // console.log("DataObj", DataObj);

    const dropObj = comps.find((value) => {
      return value.type === type;
    });
    // console.log("dropObj", dropObj);

    var isantd = dropObj?.module;
    if (isantd === "antd") {
      if (type === "Table") {
        // console.log("str",str);
        // console.log("table", dropObj);

        str = new Context(new Table(dropObj as any)).render();
      } else if (type === "Radio.Group") {
        // console.log("Radio", dropObj);
        str = new Context(new Radio(dropObj as any)).render();
      }
    }
  }
  return str;
}
