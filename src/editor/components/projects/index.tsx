import { Dropdown, Menu, MenuProps, Modal } from "antd";
import { useFileStore } from "../../store/files";
import Preview from "../preview";
import { useMemo } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { useComponetsStore } from "../../store/components";
import { Allotment } from "allotment";
import { cloneDeep } from "lodash";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

const Projects = () => {
  const { files, selectedFileKey, getFile, setFileKey } = useFileStore();
  const { deleteFile } = useFileStore();
  const { setComponents } = useComponetsStore();

  const menuItems: MenuProps["items"] = files.map((f) => {
    const label = (
      <div className="flex justify-between">
        {f.name}
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: (
                  <span onClick={() => setComponents(f.name, f.file)}>
                    编辑
                  </span>
                )
              },
              {
                key: "delete",
                disabled: f.name === "示例页面",
                label: (
                  <span
                    onClick={() => {
                      Modal.confirm({
                        title: "确认删除此页面?",
                        okText: "确认",
                        cancelText: "取消",
                        onOk: () => {
                          deleteFile(f.name);
                          setFileKey(files[0].name);
                        }
                      });
                    }}
                  >
                    删除
                  </span>
                )
              }
            ]
          }}
        >
          <EllipsisOutlined />
        </Dropdown>
      </div>
    );
    return getItem(label, f.name);
  });

  const curPreviewFile = useMemo(
    () => getFile(selectedFileKey)?.file ?? [],
    [selectedFileKey]
  );

  return (
    <div className="h-full flex">
      <Allotment>
        <Allotment.Pane minSize={150} preferredSize={160} maxSize={200}>
          <Menu
            mode="inline"
            onClick={(e) => setFileKey(e.key)}
            selectedKeys={[selectedFileKey ?? files[0].name]}
            items={menuItems}
            className="h-full w-full overflow-y-auto"
          />
        </Allotment.Pane>
        <Allotment.Pane>
          <div className="h-full flex-1">
            <Preview components={cloneDeep(curPreviewFile)} />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default Projects;
