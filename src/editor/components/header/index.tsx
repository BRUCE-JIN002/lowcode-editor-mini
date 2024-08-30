import { Button, Space } from "antd";
import { useComponetsStore } from "../../store/components";
import { createFromIconfontCN } from "@ant-design/icons";
import SaveFileModal from "./SaveFileModal";
import { useFileStore } from "../../store/files";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_4662074_xpfpvpzj1h.js"]
});

export default function Header() {
  const { mode, fileName, setCurComponentId, setMode } = useComponetsStore();
  const { setFileKey } = useFileStore();

  return (
    <div className="h-full w-full">
      <div className="h-[50px] flex justify-between items-center px-[20px]">
        <div>
          <IconFont type="icon-didaimapingtailogo" className="text-lg" />
          <span className="ml-2 font-mono">SuperCooler</span>
        </div>
        {mode !== "project" && (
          <div
            className="text-gray-950 hover:text-blue-500 hover:underline"
            onClick={() => {
              if (fileName) {
                setFileKey(fileName);
                setMode("project");
              }
            }}
          >
            {fileName}
          </div>
        )}
        <>
          {mode === "edit" && (
            <Button
              type="primary"
              onClick={() => {
                setMode("preview");
                setCurComponentId(null);
              }}
            >
              预览
            </Button>
          )}
          {mode === "preview" && (
            <Space size={12}>
              <Button
                type="default"
                onClick={() => {
                  setMode("edit");
                }}
              >
                退出预览
              </Button>
              <SaveFileModal />
            </Space>
          )}
        </>
      </div>
    </div>
  );
}
