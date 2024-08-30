import { Table as AntdTable, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CommonComponentProps } from "../../interface";
import { mockMap } from "./mock";

const Table = ({ url, children }: CommonComponentProps) => {
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (url) {
      if (mockMap[url]) {
        setLoading(true);

        setTimeout(() => {
          setData(mockMap[url]);
          setLoading(false);
        }, 1000);
      } else {
        try {
          setLoading(true);
          await axios({
            method: "get",
            url,
            timeout: 5000
          })
            .then((response) => {
              setData(response.data);
            })
            .catch((e) => {
              if (e.code === "ECONNABORTED") {
                message.error("请求超时!");
              }
            });
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === "date") {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) =>
            value ? dayjs(value).format("YYYY-MM-DD") : null
        };
      } else {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex
        };
      }
    });
  }, [children]);

  return (
    <AntdTable
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
};

export default Table;
