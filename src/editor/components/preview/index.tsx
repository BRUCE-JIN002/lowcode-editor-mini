import React, { useRef } from "react";
import { message } from "antd";
import { Component } from "../../store/components";
import { useComponentConfigStore } from "../../store/component-config";
import { ActionConfig } from "../setting/ActionModal";
import ErrorBoundary from "./ErrorBoundary";
interface PreviewProps {
  components: Component[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { components } = props;
  const { componentConfig } = useComponentConfigStore();
  const componentRefs = useRef<Record<string, unknown>>({});

  function handleEvent(component: Component) {
    const props: Record<string, unknown> = {};

    const config = componentConfig?.[component.name];
    if (!config?.events) {
      return props;
    }

    config.events.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = (...args: unknown[]) => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === "goToLink") {
              window.location.href = action.url;
            } else if (action.type === "showMessage") {
              if (action.config.type === "success") {
                message.success(action.config.text);
              } else if (action.config.type === "error") {
                message.error(action.config.text);
              }
            } else if (action.type === "customJS") {
              const func = new Function("context", "args", action.code);
              func(
                {
                  name: component.name,
                  props: component.props,
                  showMessage(content: string) {
                    message.success(content);
                  },
                },
                args
              );
            } else if (action.type === "componentMethod") {
              const component =
                componentRefs.current[action.config.componentId];
              if (
                component &&
                typeof component === "object" &&
                component !== null
              ) {
                const method = (component as Record<string, unknown>)[
                  action.config.method
                ];
                if (typeof method === "function") {
                  method(...args);
                }
              }
            }
          });
        };
      }
    });
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    if (!components || !Array.isArray(components)) {
      return null;
    }

    return components.map((component: Component) => {
      if (!component || !component.name) {
        return null;
      }

      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        console.warn(`No prod config found for component: ${component.name}`);
        return null;
      }

      const elementProps = {
        key: component.id,
        id: component.id,
        name: component.name,
        styles: component.styles,
        ...config.defaultProps,
        ...component.props,
        ...handleEvent(component),
      };

      // 只给特定的组件类型添加 ref，避免给普通函数组件添加 ref
      const componentsWithRef = ["Form", "Modal"];
      if (componentsWithRef.includes(component.name)) {
        elementProps.ref = (ref?: Record<string, unknown>) => {
          if (ref) {
            componentRefs.current[component.id] = ref;
          }
        };
      }

      return React.createElement(
        config.prod,
        elementProps,
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <ErrorBoundary>
      <div>{renderComponents(components)}</div>
    </ErrorBoundary>
  );
};

export default Preview;
