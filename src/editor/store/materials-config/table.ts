import { ComponentConfig } from "../component-config";

import TableDev from "../../materials/Table/dev";
import TableProd from "../../materials/Table/prod";

export const tableConfig: ComponentConfig = {
  name: "Table",
  defaultProps: {},
  desc: "表格",
  setter: [
    {
      name: "url",
      label: "url",
      type: "input"
    }
  ],
  dev: TableDev,
  prod: TableProd
};
