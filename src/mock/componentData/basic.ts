import { Interface } from "readline";
import { ElementType } from "types";

const basicItems: ElementType[] = [
  {
    type: "div",
    props: {
      children: ["div"],
    },
  },
  {
    type: "h1",
    props: {
      children: ["H1"],
    },
  },

  {
    type: "p",
    props: {
      children: ["段落"],
    },
  },
  {
    type: "button",
    props: {
      children: ["按钮"],
    },
  },
  {
    type: "input",
    blink: true,
    props: {
      other: {
        type: "text",
        placeholder: "pleaceholder",
      },
    },
  },
  {
    type: "select",
    props: {
      children: [
        {
          type: "option",
          props: {
            value: "man",
            children: ["man"],
          },
        },
        {
          type: "option",
          props: {
            value: "woman",
            children: ["woman"],
          },
        },
      ],
      placeholder: "pleaceholder",
    },
  },
  {
    type: "img",
    blink: true,
    props: {
      other: {
        width: "100",
        height: "100",
        src: "https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png",
      },
    },
  },
  {
    type: "span",
    props: {
      children: ["文本"],
    },
  },
  {
    type: "Link",
    module: "react-router-dom",
    props: {
      to: "https://ant.design/components/overview-cn/",
      children: ["链接"],
    },
  },
];

export default basicItems;

export interface IEditField {
  [x: string]: any;
  prop: string;
  name: string;
  type: string;
}

export const basicEditFields: Record<string, IEditField[]> = {
  div: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
  ],
  h1: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
  ],
  p: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
  ],
  span: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
  ],
  img: [
    {
      prop: "src",
      name: "图片地址",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
    {
      prop: "width",
      name: "宽度",
      type: "Number",
    },
    {
      prop: "height",
      name: "高度",
      type: "Number",
    },
  ],
  button: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
  ],
  input: [
    {
      prop: "type",
      name: "类型",
      type: "Text",
    },
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
    {
      prop: "other.placeholder",
      name: "提示",
      type: "Text",
    },
  ],
  select: [
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
    {
      prop: "placeholder",
      name: "提示",
      type: "Text",
    },
    {
      prop: "children",
      name: "选项",
      type: "EditableTable",
      columns: [
        {
          title: "显示值",
          dataIndex: "label",
          editable: true,
          width: "40%",
        },
        {
          title: "选项值",
          dataIndex: "value",
          editable: true,
          width: "40%",
        },
      ],
    },
  ],
  Link: [
    {
      prop: "style",
      name: "样式",
      type: "Text",
    },
    {
      prop: "to",
      name: "链接",
      type: "Text",
    },
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
  ],
};
