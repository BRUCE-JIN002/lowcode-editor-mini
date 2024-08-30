import { Button, Collapse, CollapseProps } from "antd";
import { getComponentById, useComponetsStore } from "../../store/components";
import {
  ComponentEvent,
  useComponentConfigStore
} from "../../store/component-config";
import { useEffect, useState } from "react";
import { ActionConfig, ActionModal } from "./ActionModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function ComponentEvents() {
  const { components, curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [curAction, setCurAction] = useState<ActionConfig>();
  const [curActionIndex, setCurActionIndex] = useState<number>();
  const [activeKey, setActiveKey] = useState<string[]>();

  useEffect(
    () =>
      setActiveKey(
        componentConfig[curComponent!.name].events
          ?.filter((e) => curComponent?.props[e.name]?.actions.length > 0)
          .map((item) => item.name) ?? []
      ),
    [curComponent, componentConfig]
  );

  const deleteAction = (event: ComponentEvent, index: number) => {
    if (!curComponent) {
      return;
    }

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(curComponent.id, {
      [event.name]: {
        actions: actions
      }
    });
  };

  const handleModalOk = (config?: ActionConfig) => {
    if (!config || !curEvent || !curComponent) {
      setActionModalOpen(false);
      return;
    }

    if (curAction) {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: curComponent.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curActionIndex ? config : item;
            }
          )
        }
      });
    } else {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: [
            ...(curComponent.props[curEvent.name]?.actions || []),
            config
          ]
        }
      });
    }
    setCurAction(undefined);
    setActionModalOpen(false);
  };

  const editAction = (config: ActionConfig, index: number) => {
    if (!curComponentId) {
      return;
    }

    setCurAction(config);
    setCurActionIndex(index);
    setActionModalOpen(true);
  };

  const items: CollapseProps["items"] = (
    componentConfig[curComponent!.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setCurEvent(event);
              setActionModalOpen(true);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent?.props[event.name]?.actions || []).map(
            (item: ActionConfig, index: number) => {
              return (
                <div key={item.type + index}>
                  {item.type === "goToLink" && (
                    <div className="border border-[#ccc] rounded m-[10px] p-[10px] relative">
                      <div className="text-[blue]">跳转链接</div>
                      <div>{item.url}</div>
                      <div
                        className=" absolute top-[10px] right-[10px] cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                      <div
                        className=" absolute top-[10px] right-[30px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                    </div>
                  )}
                  {item.type === "showMessage" && (
                    <div className="border border-[#ccc] rounded m-[10px] p-[10px] relative">
                      <div className="text-[blue]">消息弹窗</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <div
                        className=" absolute top-[10px] right-[10px] cursor-pointer "
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                      <div
                        className=" absolute top-[10px] right-[35px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                    </div>
                  )}
                  {item.type === "customJS" && (
                    <div className="border border-[#ccc] rounded m-[10px] p-[10px] relative">
                      <div className="text-[blue]">自定义 JS</div>
                      <div
                        className=" absolute top-[10px] right-[10px] cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                      <div
                        className=" absolute top-[10px] right-[35px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                    </div>
                  )}
                  {item.type === "componentMethod" && (
                    <div
                      key="componentMethod"
                      className="border border-[#aaa] rounded m-[10px] p-[10px] relative"
                    >
                      <div className="text-[blue]">组件方法</div>
                      <div>
                        {
                          getComponentById(item.config.componentId, components)
                            ?.desc
                        }
                      </div>
                      <div>{item.config.componentId}</div>
                      <div>{item.config.method}</div>
                      <div
                        className=" absolute top-[10px] right-[35px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                      <div
                        className=" absolute top-[10px] right-[10px] cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )
    };
  });

  if (
    !curComponent ||
    !curComponentId ||
    !componentConfig[curComponent!.name].events?.length
  )
    return null;

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        activeKey={activeKey}
        onChange={(val) => setActiveKey([...val])}
      />
      <ActionModal
        visible={actionModalOpen}
        action={curAction}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
