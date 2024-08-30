import { useComponetsStore } from "../../../store/components";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

export interface GoToLinkProps {
  value?: string;
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export function GoToLink(props: GoToLinkProps) {
  const { value: val, defaultValue, onChange } = props;
  const [value, setValue] = useState(defaultValue);
  const { curComponentId } = useComponetsStore();

  useEffect(() => {
    setValue(val);
  }, [val]);

  const urlChange = (value: string) => {
    if (!curComponentId) return;

    setValue(value);

    onChange?.({
      type: "goToLink",
      url: value
    });
  };

  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex-1">
        <TextArea
          style={{
            height: 200,
            maxHeight: 600,
            width: "100%",
            border: "1px solid #ccc"
          }}
          onChange={(e) => urlChange(e.target.value)}
          value={value ?? ""}
          placeholder="粘贴链接或填入url..."
        />
      </div>
    </div>
  );
}
