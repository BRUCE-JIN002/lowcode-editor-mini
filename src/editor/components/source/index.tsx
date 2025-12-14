import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useComponetsStore } from "../../store/components";

export function Source() {
  const { components } = useComponetsStore();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  return (
    <MonacoEditor
      height={"100%"}
      path="component.json"
      language="json"
      value={JSON.stringify(components, null, 2)}
      onMount={handleEditorDidMount}
      options={{
        readOnly: true,
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
    ></MonacoEditor>
  );
}
