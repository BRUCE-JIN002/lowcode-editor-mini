import classNames from "classnames";
import { isEqual } from "lodash";

import {
  PlusOutlined,
  SettingOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";
import { defaultConfig, useComponetsStore } from "../../store/components";
import { Modal } from "antd";
import { useFileStore } from "../../store/files";

export default function SideBar() {
  const { setFileKey } = useFileStore();
  const { mode, components, setMode, resetComponent } = useComponetsStore();
  return (
    <div
      className={classNames(
        `flex flex-col items-center h-full justify-between py-4`
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <FolderOpenOutlined
          title="工程页面"
          className="cursor-pointer text-[#434242] hover:text-blue-400"
          onClick={() => {
            setMode("project");
          }}
        />
        <PlusOutlined
          title="新建页面"
          className="cursor-pointer text-[#434242] hover:text-blue-400"
          onClick={() => {
            if (mode === "edit" && !isEqual(components, defaultConfig)) {
              Modal.confirm({
                title: "新建项目",
                okText: "确定",
                cancelText: "取消",
                content: <span>新建项目将废弃当前编辑，确定新建？</span>,
                onOk: () => resetComponent()
              });
            }
            setMode("edit");
            setFileKey(undefined);
          }}
        />
      </div>
      <SettingOutlined
        title="设置"
        className="cursor-pointer text-[#434242] hover:text-blue-400"
      />
    </div>
  );
}
