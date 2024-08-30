import React, { useEffect, useMemo, useRef } from "react";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";
import { Table as AntdTable } from "antd";

function Table({ id, name, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(["TableColumn"], id);
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
    drag(divRef);
    drop(divRef);
  }, []);

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div
            className="m-[-16px] p-[16px] text-sm"
            data-component-id={item.props?.id}
          >
            {item.props?.title}
          </div>
        ),
        dataIndex: item.props?.dataIndex,
        key: item
      };
    });
  }, [children]);

  return (
    <div
      ref={divRef}
      className={`w-full ${
        canDrop ? "border-[1px] border-[blue]" : "border-[1px] border-[#ccc]"
      }`}
      data-component-id={id}
      style={styles}
    >
      <AntdTable
        columns={columns}
        dataSource={[]}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default Table;
