import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useComponetsStore } from "../../../store/components";
import { useEffect, useState } from "react";

export interface CustomJSConfig {
  type: "customJS";
  code: string;
}

export interface CustomJSProps {
  value?: string;
  defaultValue?: string;
  onChange: (config: CustomJSConfig) => void;
}

export const CunstomJS = (props: CustomJSProps) => {
  const { value: val, defaultValue, onChange } = props;
  const { curComponentId } = useComponetsStore();
  const [value, setValue] = useState(defaultValue);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  useEffect(() => {
    setValue(val);
  }, [val]);

  const codeChange = (value?: string) => {
    if (!curComponentId) return;
    setValue(value);

    onChange?.({
      type: "customJS",
      code: value!
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-[12px]">
        <div>自定义脚本</div>
        <div className="flex-1 relative">
          <MonacoEditor
            width={"100%"}
            height={"435px"}
            path="action.js"
            language="javascript"
            onMount={handleEditorMount}
            onChange={codeChange}
            value={value}
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false
              },
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6
              }
            }}
          />
          <div className="absolute inset-0 bg-[#00000030] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
