import { Form as AntdForm, DatePicker, Input } from "antd";
import { ForwardRefRenderFunction, useImperativeHandle, useMemo } from "react";
import { CommonComponentProps } from "../../interface";
import dayjs from "dayjs";
import React from "react";

export interface FormRef {
  submit: () => void;
}

const Form: ForwardRefRenderFunction<FormRef, CommonComponentProps> = (
  { children, onFinish },
  ref
) => {
  const [form] = AntdForm.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.submit();
        }
      };
    },
    [form]
  );

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules
      };
    });
  }, [children]);

  async function onSave(values: any) {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format("YYYY-MM-DD");
      }
    });

    onFinish(values);
  }

  return (
    <AntdForm
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      onFinish={onSave}
    >
      {formItems.map((item: any) => {
        return (
          <AntdForm.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={
              item.rules === "required"
                ? [
                    {
                      required: true,
                      message: `${item.label}不能为空`
                    }
                  ]
                : []
            }
          >
            {item.type === "input" && <Input style={{ width: 300 }} />}
            {item.type === "date" && <DatePicker />}
          </AntdForm.Item>
        );
      })}
    </AntdForm>
  );
};

export default React.forwardRef(Form);
