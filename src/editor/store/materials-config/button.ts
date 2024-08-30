import { ComponentConfig } from "../component-config";

import ButtonDev from "../../materials/Button/dev";
import ButtonProd from "../../materials/Button/prod";

export const buttonConfig: ComponentConfig = {
  name: "Button",
  defaultProps: {
    type: "primary",
    text: "按钮"
  },
  setter: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      options: [
        { label: "default", value: "default" },
        { label: "primary", value: "primary" },
        { label: "dashed", value: "dashed" },
        { label: "link", value: "link" },
        { label: "text", value: "text" }
      ]
    },
    {
      name: "text",
      label: "文本",
      type: "input"
    }
  ],
  stylesSetter: [
    {
      name: "width",
      label: "宽度",
      type: "inputNumber"
    },
    {
      name: "height",
      label: "高度",
      type: "inputNumber"
    }
  ],
  events: [
    {
      name: "onClick",
      label: "点击事件"
    },
    {
      name: "onDoubleClick",
      label: "双击事件"
    }
  ],
  desc: "按钮",
  dev: ButtonDev,
  prod: ButtonProd
};
