import { Input, Select } from "antd";
import { useComponetsStore } from "../../../store/components";
import { useEffect, useState } from "react";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}

export interface ShowMessageProps {
  value?: ShowMessageConfig["config"];
  defaultValue?: ShowMessageConfig["config"];
  onChange?: (config: ShowMessageConfig) => void;
}

export function ShowMessage(props: ShowMessageProps) {
  const { value: val, defaultValue, onChange } = props;
  const [type, setType] = useState<"success" | "error">(
    defaultValue?.type || "success"
  );
  const [text, setText] = useState<string>(defaultValue?.text || "");
  const { curComponentId } = useComponetsStore();

  useEffect(() => {
    if (val) {
      setType(val.type);
      setText(val.text);
    }
  }, [val]);

  const messageTypeChange = (value: "success" | "error") => {
    if (!curComponentId) return;

    setType(value);

    onChange?.({
      type: "showMessage",
      config: {
        type: value,
        text
      }
    });
  };

  const messageTextChange = (value: string) => {
    if (!curComponentId) return;

    setText(value);

    onChange?.({
      type: "showMessage",
      config: {
        type,
        text: value
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div className="flex-1">
          <Select
            placeholder="请选择消息类型"
            style={{ width: "100%", height: 50 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" }
            ]}
            onChange={(value) => messageTypeChange(value)}
            value={type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div className="flex-1">
          <Input
            placeholder="请输入提示内容..."
            style={{ width: "100%", height: 50 }}
            onChange={(e) => messageTextChange(e.target.value)}
            value={text}
          />
        </div>
      </div>
    </>
  );
}
