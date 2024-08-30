import { Form as AntdForm, Input } from "antd";
import React, { useEffect, useMemo, useRef } from "react";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

function Form({ id, name, children, onFinish }: CommonComponentProps) {
  const [form] = AntdForm.useForm();

  const { canDrop, drop } = useMaterailDrop(["FormItem"], id);

  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: "move",
      id: id
    }
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id
      };
    });
  }, [children]);

  return (
    <div
      className={`w-full p-[20px] min-h-[100px] ${
        canDrop ? "border-[1px] border-[blue]" : "border-[1px] border-[#ccc]"
      }`}
      ref={divRef}
      data-component-id={id}
    >
      <AntdForm
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={(values) => onFinish?.(values)}
      >
        {formItems.map((item: any) => {
          return (
            <AntdForm.Item
              key={item.name}
              data-component-id={item.id}
              name={item.name}
              label={item.label}
            >
              <Input style={{ pointerEvents: "none" }} />
            </AntdForm.Item>
          );
        })}
      </AntdForm>
    </div>
  );
}

export default Form;
