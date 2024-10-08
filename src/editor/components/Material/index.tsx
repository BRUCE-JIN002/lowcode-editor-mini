import { useMemo } from "react";
import { useComponentConfigStore } from "../../store/component-config";
import MaterialItem from "../materialItem";

const Material: React.FC = () => {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== "Page"
    );
  }, [componentConfig]);

  return (
    <div className="flex flex-wrap ">
      {components.map((item, index) => {
        return (
          <MaterialItem
            name={item.name}
            key={item.name + index}
            desc={item.desc}
          />
        );
      })}
    </div>
  );
};

export default Material;
