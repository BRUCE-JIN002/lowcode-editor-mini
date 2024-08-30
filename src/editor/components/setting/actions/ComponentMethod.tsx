import { Select, TreeSelect } from "antd";
import {
  Component,
  getComponentById,
  useComponetsStore
} from "../../../store/components";
import { useComponentConfigStore } from "../../../store/component-config";
import { useEffect, useState } from "react";

export interface ComponentMethodConfig {
  type: "componentMethod";
  config: {
    componentId: number;
    method: string;
  };
}

export interface ComponentMethodProps {
  value?: ComponentMethodConfig["config"];
  onChange?: (config: ComponentMethodConfig) => void;
}

export function ComponentMethod(props: ComponentMethodProps) {
  const { value, onChange } = props;
  const { components, curComponentId } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [selectedComponent, setSelectedComponent] =
    useState<Component | null>();

  const [curId, setCurId] = useState<number>();
  const [curMethod, setCurMethod] = useState<string>();

  useEffect(() => {
    if (value) {
      setCurId(value.componentId);
      setCurMethod(value.method);

      setSelectedComponent(getComponentById(value.componentId, components));
    }
  }, [value]);

  const componentChange = (id: number) => {
    if (!curComponentId) return;

    setCurId(id);
    setSelectedComponent(getComponentById(id, components));
  };

  const componentMethodChange = (value: string) => {
    if (!curComponentId || !selectedComponent) return;

    setCurMethod(value);

    onChange?.({
      type: "componentMethod",
      config: {
        componentId: selectedComponent.id,
        method: value
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div>组件：</div>
        <div className="flex-1">
          <TreeSelect
            placeholder="请选择要关联的组件"
            value={curId}
            style={{ width: "100%", height: 50 }}
            fieldNames={{ label: "name", value: "id" }}
            treeData={components}
            onChange={(value) => {
              componentChange(value);
            }}
          />
        </div>
      </div>
      {componentConfig[selectedComponent?.name || ""] && (
        <div className="flex items-center gap-[10px] mt-[10px]">
          <div>方法：</div>
          <div className="flex-1">
            <Select
              placeholder="请选择要关联的方法"
              value={curMethod}
              style={{ width: "100%", height: 50 }}
              options={componentConfig[
                selectedComponent?.name || ""
              ].methods?.map((method) => ({
                label: method.label,
                value: method.name
              }))}
              onChange={(value) => {
                componentMethodChange(value);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
