import { ElementType } from "types";
import { IEditField } from "./type";

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
        src: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg",
      },
    },
  },
  {
    type: "span",
    props: {
      children: ["文本"],
    },
  },
];


export const basicEditFields: Record<string, IEditField[]> = {
  div: [
    {
      prop: "children",
      name: "内容",
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
  ],
  span: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
  ],
  img: [
    {
      prop: "other.src",
      name: "图片地址",
      type: "Text",
    },
  ],
  button: [
    {
      prop: "children",
      name: "内容",
      type: "Text",
    },
  ],
  input: [
    {
      prop: "other.type",
      name: "类型",
      type: "Select",
      defaultValue: "text",
      options: [
        {
          value: "text",
          label: "text",
        },
        {
          value: "password",
          label: "password",
        },
        {
          value: "file",
          label: "file",
        },
        {
          value: "reset",
          label: "reset",
        },
        {
          value: "submit",
          label: "submit",
        },
      ],
    },
    {
      prop: "other.placeholder",
      name: "提示",
      type: "Text",
    },
  ],
  select: [
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
};

export const basicEventFields: Record<string, IEditField[]> = {
  button: [
    {
      prop: "event.onClick",
      name: "点击事件onClick",
      type: "Textarea",
    },
  ],
  input: [
    {
      prop: "event.onChange",
      name: "输入改变事件onChange",
      type: "Textarea",
    },
  ],
};

export default basicItems;