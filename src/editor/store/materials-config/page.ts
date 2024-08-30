import { ComponentConfig } from "../component-config";

import PageDev from "../../materials/Page/dev";
import PageProd from "../../materials/Page/prod";

export const pageConfig: ComponentConfig = {
  name: "Page",
  defaultProps: {},
  desc: "页面",
  dev: PageDev,
  prod: PageProd
};
