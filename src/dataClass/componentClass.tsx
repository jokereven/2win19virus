export default class component {
  static count = 0;
  tag: any;
  parent: component | null = null;
  key: number;
  style: Object;
  children: Array<component | string>;
  event: Object;
  blink: boolean;
  constructor(
    tag: any = "div",
    style: Object = {},
    event: Object = {},
    children: Array<component | string> = [],
    blink: boolean = false
  ) {
    this.tag = tag;
    this.style = style;
    this.event = event;
    this.children = children;
    this.blink = blink;
    this.key = component.count;
    component.count++;
  }
  r(): any {
    if (!this.blink) {
      return (
        <this.tag
          {...this.event}
          key={this.key}
          data-key={this.key}
          style={this.style}
        >
          {this.children.map((item) => {
            if (item instanceof component) return item.r();
            else return item;
          })}
        </this.tag>
      );
    } else {
      return <this.tag {...this.event} style={this.style} />;
    }
  }
}
