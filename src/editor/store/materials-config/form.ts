import { ComponentConfig } from "../component-config";

import FormDev from "../../materials/Form/dev";
import FormProd from "../../materials/Form/prod";

export const formConfig: ComponentConfig = {
  name: "Form",
  defaultProps: {},
  desc: "表单",
  setter: [
    {
      name: "title",
      label: "标题",
      type: "input"
    }
  ],
  events: [
    {
      name: "onFinish",
      label: "提交事件"
    }
  ],
  methods: [
    {
      name: "submit",
      label: "提交"
    }
  ],
  dev: FormDev,
  prod: FormProd
};
