import { useComponetsStore } from "../../store/components";
import { Segmented } from "antd";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentStyle } from "./ComponentStyle";
import { ComponentEvents } from "./ComponentEvent";

export const enum Settings {
  Attribute = "属性",
  Style = "样式",
  Event = "事件"
}

const SettingMap: Record<Settings, Settings> = {
  [Settings.Attribute]: Settings.Attribute,
  [Settings.Style]: Settings.Style,
  [Settings.Event]: Settings.Event
};

interface SettingProps {
  value: Settings;
  onChange: (v: Settings) => void;
}

export function Setting(props: SettingProps) {
  const { value, onChange } = props;

  const { curComponentId } = useComponetsStore();

  return (
    <div>
      <Segmented
        block
        value={value}
        onChange={onChange}
        options={Object.values(SettingMap)}
      />
      {curComponentId && (
        <div className="pt-[20px]">
          {value === Settings.Attribute && <ComponentAttr />}
          {value === Settings.Style && <ComponentStyle />}
          {value === Settings.Event && <ComponentEvents />}
        </div>
      )}
    </div>
  );
}
