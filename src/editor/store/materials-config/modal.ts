import { ComponentConfig } from "../component-config";

import ModalDev from "../../materials/Modal/dev";
import ModalProd from "../../materials/Modal/prod";

export const modalConfig: ComponentConfig = {
  name: "Modal",
  defaultProps: {
    title: "弹窗"
  },
  setter: [
    {
      name: "title",
      label: "标题",
      type: "input"
    }
  ],
  stylesSetter: [],
  events: [
    {
      name: "onOk",
      label: "确认事件"
    },
    {
      name: "onCancel",
      label: "取消事件"
    }
  ],
  methods: [
    {
      name: "open",
      label: "打开弹窗"
    },
    {
      name: "close",
      label: "关闭弹窗"
    }
  ],
  desc: "弹窗",
  dev: ModalDev,
  prod: ModalProd
};
