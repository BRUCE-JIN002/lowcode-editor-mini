import { Button, Form, Input, message, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useComponetsStore } from "../../store/components";
import { useFileStore } from "../../store/files";
import { cloneDeep } from "lodash";

interface FormData {
  filename: string;
  type: EditType;
}

const enum EditType {
  edit = "edit",
  add = "add"
}

export default function SaveFileModal() {
  const [open, setOpen] = useState(false);
  const [stateFileName, setFilName] = useState<string>();
  const { components, fileName, setFileName, resetComponent, setMode } =
    useComponetsStore();
  const { addFile, setFileKey, isExistFile, updateFile } = useFileStore();
  const [form] = Form.useForm<FormData>();

  const handleOk = async () => {
    form.validateFields().then((data) => {
      const { filename } = data;
      if (isExistFile(filename)) {
        if (data.type === "edit") {
          updateFile(filename, cloneDeep(components));
        } else if (data.type === "add") {
          message.error("已存在同名文件！");
          return;
        }
      } else {
        addFile(filename, cloneDeep(components));
      }
      setFileName(filename);
      setOpen(false);
      resetComponent();
      setMode("project");
      setFileKey(filename);
    });
  };

  useEffect(() => {
    if (fileName && open) {
      form.setFieldsValue({ filename: fileName });
    }
  }, [open]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        保存项目
      </Button>
      <Modal
        title={
          <span className="flex gap-2">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            保存文件
          </span>
        }
        open={open}
        okText="确定"
        cancelText="取消"
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ padding: 12 }}
        >
          <Form.Item
            label="文件名"
            name="filename"
            rules={[
              {
                required: true,
                message: "文件名不能为空"
              }
            ]}
          >
            <Input
              placeholder="请输入文件名"
              value={stateFileName}
              onChange={(e) => setFilName(e.target.value)}
            />
          </Form.Item>
          {fileName && (
            <Form.Item label="类型" name="type" initialValue={EditType.edit}>
              <Radio.Group>
                <Radio value={EditType.edit}>修改</Radio>
                <Radio value={EditType.add}>新增</Radio>
              </Radio.Group>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
}
