import { Divider, Segmented, Tabs } from "antd";
import Material from "../Material";
import { Outline } from "../Outline";
import { Source } from "../Source";
import classNames from "classnames";
import {
  AppstoreOutlined,
  ApartmentOutlined,
  CodeOutlined,
  SkinOutlined,
  TagsOutlined,
  SwitcherOutlined
} from "@ant-design/icons";
import { Settings } from "../Setting";

export const enum Category {
  Material = "物料",
  Outlint = "大纲",
  SourceCode = "源码"
}

const categoryOptions: { [key: string]: any } = {
  [Category.Material]: <AppstoreOutlined />,
  [Category.Outlint]: <ApartmentOutlined />,
  [Category.SourceCode]: <CodeOutlined />
};

const settingOptions: { [key: string]: any } = {
  [Settings.Attribute]: <SwitcherOutlined />,
  [Settings.Style]: <SkinOutlined />,
  [Settings.Event]: <TagsOutlined />
};

interface MaterialProps {
  categoryKey: Category;
  settingKey: Settings;
  onCategoryChange: (v: Category) => void;
  onSettingChange: (v: Settings) => void;
}

export function MaterialWrapper(props: MaterialProps) {
  const { categoryKey, settingKey, onSettingChange, onCategoryChange } = props;

  return (
    <div className="flex">
      <div
        className={classNames(
          `border-r-[#ccc] w-[45px]
          h-[calc(100vh-55px)] flex flex-col pt-1 
          border overflow-hidden`
        )}
      >
        <Tabs
          tabPosition="left"
          size="small"
          onTabClick={(key) => onCategoryChange(key as Category)}
          activeKey={categoryKey}
          items={Object.keys(categoryOptions).map((name) => {
            return {
              label: ``,
              icon: categoryOptions[name],
              key: name
            };
          })}
          style={{ padding: 0, marginLeft: -10 }}
        />
        <Divider />
        <Tabs
          tabPosition="left"
          size="small"
          onTabClick={(key) => onSettingChange(key as Settings)}
          activeKey={settingKey}
          items={Object.keys(settingOptions).map((name) => {
            return {
              label: ``,
              icon: settingOptions[name],
              key: name
            };
          })}
          style={{ padding: 0, marginLeft: -10 }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Segmented
          block
          value={categoryKey}
          onChange={onCategoryChange}
          options={Object.keys(categoryOptions) as Category[]}
        />
        <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
          {categoryKey === Category.Material && <Material />}
          {categoryKey === Category.Outlint && <Outline />}
          {categoryKey === Category.SourceCode && <Source />}
        </div>
      </div>
    </div>
  );
}
