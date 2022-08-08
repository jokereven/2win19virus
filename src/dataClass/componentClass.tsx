import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
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
      var chooseDOM: HTMLElement = e.target;
      store.dispatch({
        type: stateConstantas.CHOOSEDOM,
        data: {
          key: this.key,
          optLeft: getElementLeft(chooseDOM),
          optTop: getElementTop(chooseDOM),
        },
      });
      e.stopPropagation();
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
