import * as antd from "antd";
import { stateConstantas } from "redux/constantas";
import { search } from "redux/reducers/stateReducers";
import { store } from "redux/store";
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
  style: string;
  children: Array<component | string>;
  event: Object = {};
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
    onDragOver: (e: any) => {
      var targetDOM =
        store.getState().StateReducer.targetDOM ||
        store.getState().StateReducer.stateNode;
      var chooseDOM: HTMLElement | null = e.target;
      var left: number = 0;
      var top: number = 0;
      var key: number | undefined = -1;
      while (chooseDOM != null) {
        if (chooseDOM.dataset.key !== undefined) {
          key = parseInt(chooseDOM.dataset.key);
          left = getElementLeft(chooseDOM, false);
          top = getElementTop(chooseDOM, false);
          var nowDOM = search(store.getState().StateReducer.stateNode, key);
          if (
            typeof key === "number" &&
            nowDOM instanceof component &&
            targetDOM.children.indexOf(nowDOM) !== -1
          )
            break;
        }
        chooseDOM = chooseDOM.parentElement;
      }
      var optDOM = search(store.getState().StateReducer.stateNode, key);
      if (chooseDOM === null || optDOM === null) return;
      if (
        targetDOM.children.some((item) => {
          if (item instanceof component) {
            return item.key === key;
          } else return false;
        }) === false
      )
        return;
      var width = chooseDOM.offsetWidth;
      var height = chooseDOM.offsetHeight;
      var x = e.pageX;
      var y = e.pageY;
      var classes = ["hoverLeft", "hoverRight", "hoverTop", "hoverBottom"];
      optDOM.classList = optDOM.classList.filter((value: string) => {
        return !classes.includes(value);
      });
      var method;
      if (x > left && x < left + width / 4) {
        optDOM.classList.push(classes[0]);
        method = "before";
      } else if (x > left + (width * 3) / 4 && x < left + width) {
        optDOM.classList.push(classes[1]);
        method = "after";
      } else if (y > top && y < top + height / 4) {
        optDOM.classList.push(classes[2]);
        method = "before";
      } else if (y < top + height + height && y > top + (height * 3) / 4) {
        optDOM.classList.push(classes[3]);
        method = "after";
      }
      optDOM.classList = optDOM.classList.map((item) => {
        return item;
      });
      var optDOMDate = {
        optDOM: optDOM,
        method: method,
      };
      store.dispatch({
        type: stateConstantas.UPDATEMOUSEMOVE,
        data: optDOMDate,
      });
      // e.stopPropagation();
    },
    onDragLeave: () => {
      var classes = ["hoverLeft", "hoverRight", "hoverTop", "hoverBottom"];
      this.classList = this.classList.filter((value: string) => {
        return !classes.includes(value);
      });
      store.dispatch({
        type: "update",
        data: {},
      });
    },
  };
  constructor(
    tag: any = "div",
    style: string = "{}",
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
  r(preView: boolean = false): any {
    if (preView) {
      if (!this.blink) {
        return (
          <this.tag
            {...this.event}
            key={this.key}
            data-key={this.key}
            style={this.style === "" ? null : JSON.parse(this.style)}
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
            {...this.event}
            key={this.key}
            data-key={this.key}
            style={this.style === "" ? null : JSON.parse(this.style)}
            {...this.other}
            className={
              (this.choose ? "choose " : "") + this.classList.join(" ")
            }
          />
        );
      }
    } else {
      if (!this.blink) {
        return (
          <this.tag
            {...this.editEvent}
            key={this.key}
            data-key={this.key}
            style={this.style === "" ? null : JSON.parse(this.style)}
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
            key={this.key}
            data-key={this.key}
            style={this.style === "" ? null : JSON.parse(this.style)}
            {...this.other}
            className={
              (this.choose ? "choose " : "") + this.classList.join(" ")
            }
          />
        );
      }
    }
  }
  d() {
    let resCode = `<${this.type}`;
    if (this.style) {
      resCode += " style={";
      resCode += this.style;
      resCode += "}";
    }
    if (this.event) {
      let eventKeys = Object.keys(this.event);
      eventKeys.forEach((value) => {
        console.log(value);
        console.log(this.event[value as keyof typeof this.event]);
        resCode += ` ${value}:{${
          this.event[value as keyof typeof this.event]
        }}`;
      });
    }
    if (this.other) {
      let eventKeys = Object.keys(this.other);
      if (this.type === "Table") {
        console.log(this.other);
        eventKeys.forEach((value) => {
          resCode += ` ${value}={${value}}`;
        });
      } else {
        eventKeys.forEach((value) => {
          resCode += ` ${value}="${
            this.other[value as keyof typeof this.other]
          }"`;
        });
      }
    }
    if (this.blink) {
      resCode += ` />`;
      return resCode;
    } else {
      resCode += `>`;
    }
    if (this.children && this.children.length !== 0) {
      this.children.forEach((value) => {
        if (value instanceof component) {
          resCode += `
          ${value.d()}
          `;
        } else {
          resCode += ` ${value} `;
        }
      });
    }
    resCode += `</${this.type}>`;
    return resCode;
  }
}
