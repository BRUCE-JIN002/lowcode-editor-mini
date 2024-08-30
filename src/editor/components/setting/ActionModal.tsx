import { Modal } from "antd";
import { useEffect, useState } from "react";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";
import { CunstomJS, CustomJSConfig } from "./actions/CustomJs";
import {
  ComponentMethod,
  ComponentMethodConfig
} from "./actions/ComponentMethod";
import classNames from "classnames";

export type ActionConfig =
  | GoToLinkConfig
  | ShowMessageConfig
  | CustomJSConfig
  | ComponentMethodConfig;

interface ActionModalProps {
  visible: boolean;
  action?: ActionConfig;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}

export const actionMap: { [key: string]: string } = {
  goToLink: "访问链接",
  showMessage: "消息提示",
  componentMethod: "组件方法",
  customJS: "自定义JS"
};

export function ActionModal(props: ActionModalProps) {
  const { visible, action, handleOk, handleCancel } = props;
  const [curConfig, setCurConfig] = useState<ActionConfig>();
  const [key, setKey] = useState<string>("访问链接");

  useEffect(() => {
    if (action?.type) {
      setKey(actionMap[action.type]);
    }
  }, [action]);

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px] flex gap-[20px]">
        <div className="h-[500px] w-[200px] border border-[#ccc] flex flex-col gap-[12px] p-[12px]">
          {Object.values(actionMap).map((option) => {
            return (
              <div
                key={option}
                className={classNames(
                  `border border-[#ccc] rounded 
                   w-full h-[38px] flex items-center justify-center 
                  hover:border-blue-400 cursor-pointer`,
                  { "bg-blue-100": option === key }
                )}
                onClick={() => {
                  setKey(option);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
        <div className="flex-1 border-[#ccc] border p-[15px] ">
          {key === actionMap["goToLink"] && (
            <GoToLink
              key="goToLink"
              value={action?.type === "goToLink" ? action.url : ""}
              onChange={(config) => setCurConfig(config)}
            />
          )}
          {key === actionMap["showMessage"] && (
            <ShowMessage
              key="showMessage"
              value={action?.type === "showMessage" ? action.config : undefined}
              onChange={(config) => setCurConfig(config)}
            />
          )}
          {key === actionMap["componentMethod"] && (
            <ComponentMethod
              key="componentMethod"
              value={
                action?.type === "componentMethod" ? action.config : undefined
              }
              onChange={(config) => {
                setCurConfig(config);
              }}
            />
          )}
          {key === actionMap["customJS"] && (
            <CunstomJS
              key="customJS"
              value={action?.type === "customJS" ? action.code : ""}
              onChange={(config) => setCurConfig(config)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
