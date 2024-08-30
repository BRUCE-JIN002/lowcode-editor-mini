import { Form, Input, InputNumber, Select } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { useComponetsStore } from "../../store/components";
import {
  ComponentSetter,
  useComponentConfigStore
} from "../../store/component-config";
import CssEditor from "./CssEditor";
import { debounce } from "lodash-es";
import styleToObject from "style-to-object";
import _ from "lodash";

function toCSSStr(css: Record<string, any>) {
  let str = `.component {\n`;
  for (let key in css) {
    let value = css[key];
    if (!value) {
      continue;
    }
    if (["width", "height"].includes(key) && !value.toString().endsWith("px")) {
      value += "px";
    }

    str += `\t${_.kebabCase(key)}: ${value};\n`;
  }
  str += `}`;
  return str;
}

export function ComponentStyle() {
  const [form] = Form.useForm();
  const [css, setCss] = useState<string>(`.component{\n\n}`);

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    form.resetFields();

    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });

    setCss(toCSSStr(curComponent?.styles!));
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
      console.log("changeValues", changeValues);
    }
  }

  const handleEditorChange = debounce((value) => {
    let css: Record<string, any> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, "") // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
        .replace("}", ""); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace("-", ""))
        ] = value;
      });

      updateComponentStyles(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true
      );
    } catch (e) {}
  }, 500);

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor
          value={curComponent.styles ? css : `.component{\n\n}`}
          onChange={handleEditorChange}
        />
      </div>
    </Form>
  );
}
