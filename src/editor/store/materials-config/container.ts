import { ComponentConfig } from "../component-config";

import ContainerDev from "../../materials/Containers/dev";
import ContainerProd from "../../materials/Containers/prod";

export const containerConfig: ComponentConfig = {
  name: "Container",
  defaultProps: {},
  desc: "容器",
  dev: ContainerDev,
  prod: ContainerProd
};
