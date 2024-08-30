import { ReactNode } from "react";
import { create } from "zustand";

import { containerConfig } from "./materials-config/container";
import { buttonConfig } from "./materials-config/button";
import { modalConfig } from "./materials-config/modal";
import { pageConfig } from "./materials-config/page";
import { tableConfig } from "./materials-config/table";
import { tableColumnConfig } from "./materials-config/tableColumn";
import { formConfig } from "./materials-config/form";
import { formItemConfig } from "./materials-config/formItem";
import { CommonComponentProps } from "../interface";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentMethod {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  dev: (props: CommonComponentProps) => JSX.Element;
  prod: (props: CommonComponentProps) => JSX.Element | ReactNode;
}

export const MaterialType = {
  Container: "Container",
  Button: "Button",
  Page: "Page",
  Modal: "Modal",
  Table: "Table",
  TableColumn: "TableColumn",
  Form: "Form",
  FormItem: "FormItem"
};

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    [MaterialType.Container]: containerConfig,
    [MaterialType.Button]: buttonConfig,
    [MaterialType.Page]: pageConfig,
    [MaterialType.Modal]: modalConfig,
    [MaterialType.Table]: tableConfig,
    [MaterialType.TableColumn]: tableColumnConfig,
    [MaterialType.Form]: formConfig,
    [MaterialType.FormItem]: formItemConfig
  },
  registerComponent: (name, componentConfig) =>
    set((state) => ({
      ...state,
      componentConfig: {
        ...state.componentConfig,
        [name]: componentConfig
      }
    }))
}));
