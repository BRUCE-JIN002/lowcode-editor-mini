import { ComponentConfig } from "../component-config";

import FormItemDev from "../../materials/FormItem/dev";
import FormItemProd from "../../materials/FormItem/prod";

export const formItemConfig: ComponentConfig = {
  name: "FormItem",
  desc: "表单项",
  defaultProps: {
    name: new Date().getTime(),
    label: "标签名",
    type: "input"
  },
  dev: FormItemDev,
  prod: FormItemProd,
  setter: [
    {
      name: "type",
      label: "类型",
      type: "select",
      options: [
        {
          label: "文本",
          value: "input"
        },
        {
          label: "日期",
          value: "date"
        }
      ]
    },
    {
      name: "label",
      label: "标签",
      type: "input"
    },
    {
      name: "name",
      label: "字段",
      type: "input"
    },
    {
      name: "rules",
      label: "校验",
      type: "select",
      options: [
        {
          label: "必填",
          value: "required"
        }
      ]
    }
  ]
};
