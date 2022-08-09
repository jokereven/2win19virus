import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import * as antd from "antd";
import { Style } from "util";
function getElementTop(el: any, offsetMid: boolean = true): number {
  if (
    el.offsetParent &&
    (!offsetMid || el.offsetParent.id !== "midContainer")
  ) {
    return getElementTop(el.offsetParent) + el.offsetTop;
  }
  return el.offsetTop;
}
function getElementLeft(el: any, offsetMid: boolean = true): number {
  if (
    el.offsetParent &&
    (!offsetMid || el.offsetParent.id !== "midContainer")
  ) {
    return getElementLeft(el.offsetParent) + el.offsetLeft;
  }
  return el.offsetLeft;
}

export default class component {
  static editMode: boolean = true;
  static count = 0;
  tag: any;
  type: string;
  parent: component | null;
  key: number;
  style: any;
  children: Array<component | string>;
  event: Object;
  blink: boolean;
  other: any;
  choose: boolean = false;
  classList: Array<string> = [];
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
    onMouseMove: (e: any) => {
      var targetDOM =
        store.getState().StateReducer.targetDOM ||
        store.getState().StateReducer.stateNode;
      console.log(targetDOM.children.indexOf(this));
      if (targetDOM.children.indexOf(this) === -1) {
        return;
      }
      var left = getElementLeft(e.target, false);
      var top = getElementTop(e.target, false);
      var width = (e.target as HTMLElement).offsetWidth;
      var height = (e.target as HTMLElement).offsetHeight;
      var x = e.pageX;
      var y = e.pageY;
      var classes = ["hoverLeft", "hoverRight", "hoverTop", "hoverBottom"];
      this.classList = this.classList.filter((value: string) => {
        return !classes.includes(value);
      });
      if (x > left && x < left + width / 4) {
        this.classList.push(classes[0]);
      } else if (x > left + (width * 3) / 4 && x < left + width) {
        this.classList.push(classes[1]);
      } else if (y > top && y < top + height / 4) {
        this.classList.push(classes[2]);
      } else if (y < top + height + height && y > top + (height * 3) / 4) {
        this.classList.push(classes[3]);
      }
      this.classList = this.classList.map((item) => {
        return item;
      });
      store.dispatch({
        type: "update",
        data: {},
      });
    },
    onMouseLeave: () => {
      var classes = ["hoverLeft", "hoverRight", "hoverTop", "hoverBottom"];
      this.classList = this.classList.filter((value: string) => {
        return !classes.includes(value);
      });
    },
  };
  constructor(
    tag: any = "div",
    style: any = {},
    event: Object = {},
    children: Array<component | string> = [],
    blink: boolean = false,
    other: any = {}
  ) {
    if (typeof tag === "string") {
      this.type = tag;
      let eleSource: any = antd;
      let proName = tag.split(".");
      for (let i = 0; i < proName.length; i++) {
        if (eleSource[proName[i] as keyof typeof eleSource]) {
          tag = eleSource[proName[i] as keyof typeof eleSource];
          eleSource = eleSource[proName[i] as keyof typeof eleSource];
        }
      }
    } else {
      this.type = "div";
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
          className={[
            this.classList.length !== 0 ? this.classList.join(" ") : null,
            this.choose ? "choose " : null,
          ].join(" ")}
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
          className={(this.choose ? "choose " : "") + this.classList.join(" ")}
        />
      );
    }
  }
}
