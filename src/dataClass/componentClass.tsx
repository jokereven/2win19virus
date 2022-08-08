import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import * as antd from "antd";
function getElementTop(el: any): number {
  if (el.offsetParent && el.offsetParent.id !== "midContainer") {
    return getElementTop(el.offsetParent) + el.offsetTop;
  }
  return el.offsetTop;
}
function getElementLeft(el: any): number {
  if (el.offsetParent && el.offsetParent.id !== "midContainer") {
    return getElementLeft(el.offsetParent) + el.offsetLeft;
  }
  return el.offsetLeft;
}

export default class component {
  static editMode: boolean = true;
  static count = 0;
  tag: any;
  parent: component | null;
  key: number;
  style: Object;
  children: Array<component | string>;
  event: Object;
  blink: boolean;
  other: any;
  choose: boolean = false;
  editEvent: Object = {
    onClick: (e: any) => {
      e.stopPropagation();
      var chooseDOM: HTMLElement | null = e.target;
      while (chooseDOM != null) {
        var key = chooseDOM.dataset.key;
        if (key !== undefined) {
          store.dispatch({
            type: stateConstantas.CHOOSEDOM,
            data: {
              key: parseInt(key),
              optLeft: getElementLeft(chooseDOM),
              optTop: getElementTop(chooseDOM),
            },
          });
          return;
        }
        chooseDOM = chooseDOM.parentElement;
        if (chooseDOM === null) return;
      }
    },
  };
  constructor(
    tag: any = "div",
    style: Object = {},
    event: Object = {},
    children: Array<component | string> = [],
    blink: boolean = false,
    other: any = {}
  ) {
    if (typeof tag === "string") {
      let eleSource: any = antd;
      let proName = tag.split(".");
      for (let i = 0; i < proName.length; i++) {
        if (eleSource[proName[i] as keyof typeof eleSource]) {
          tag = eleSource[proName[i] as keyof typeof eleSource];
          eleSource = eleSource[proName[i] as keyof typeof eleSource];
        }
      }
    }
    this.tag = tag;
    this.style = style;
    this.event = event;
    this.children = children;
    this.blink = blink;
    this.key = component.count;
    this.parent = null;
    this.other = other;
    component.count++;
  }
  r(): any {
    if (!this.blink) {
      return (
        <this.tag
          {...this.editEvent}
          {...this.event}
          key={this.key}
          data-key={this.key}
          style={this.style}
          className={this.choose ? "choose" : ""}
          {...this.other}
        >
          {this.children.map((item) => {
            if (item instanceof component) return item.r();
            else return item;
          })}
        </this.tag>
      );
    } else {
      return (
        <this.tag
          {...this.editEvent}
          {...this.event}
          key={this.key}
          data-key={this.key}
          style={this.style}
          {...this.other}
          className={this.choose ? "choose" : ""}
        />
      );
    }
  }
}
