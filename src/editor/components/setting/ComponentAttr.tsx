import { Form, Input, Select } from "antd";
import { useComponetsStore } from "../../store/components";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore
} from "../../store/component-config";
import { useEffect } from "react";

export function ComponentAttr() {
  const [form] = Form.useForm();
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  function valueChange(changeValues: ComponentConfig) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  }

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className="p-[12px]"
    >
      <Form.Item label="组件id">
        <Input value={curComponent?.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent?.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent?.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent!.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
