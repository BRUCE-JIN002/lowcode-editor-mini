import { Popconfirm, Tree } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useComponetsStore } from "../../store/components";
import { DataNode } from "antd/es/tree";

export function Outline() {
  const { components, curComponentId, setCurComponentId, deleteComponent } =
    useComponetsStore();

  return (
    <Tree
      showIcon
      showLine
      blockNode
      defaultExpandAll
      fieldNames={{ title: "desc", key: "id" }}
      treeData={components as unknown as DataNode[]}
      activeKey={curComponentId}
      selectedKeys={[curComponentId ?? 1]}
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number);
      }}
      icon={
        <Popconfirm
          title="删除节点？"
          okText="确定"
          showCancel={false}
          trigger={"hover"}
          onConfirm={(e) => {
            e?.stopPropagation();
            curComponentId && deleteComponent(curComponentId);
            setCurComponentId(null);
          }}
        >
          <MinusOutlined className="text-gray-800 hover:text-blue-500" />
        </Popconfirm>
      }
    />
  );
}
