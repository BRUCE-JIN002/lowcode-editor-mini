import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { EditArea } from "./components/EditArea/EditArea";
import { Setting, Settings } from "./components/Setting";
import { Category, MaterialWrapper } from "./components/MaterialWrapper";
import { useComponetsStore } from "./store/components";
import { Preview } from "./components/Preview";
import SideBar from "./components/Sidebar/Sidebar";
import Projects from "./components/Projects/Projects";
import { useState } from "react";
import Header from "./components/Header";

export default function LowcodeEditor() {
  const { mode, components } = useComponetsStore();
  const [settingKey, setSettingKey] = useState<Settings>(Settings.Attribute);
  const [categoryKey, setCategoryKey] = useState<Category>(Category.Material);

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={45} maxSize={45} minSize={45}>
          <SideBar />
        </Allotment.Pane>
        {mode === "edit" && (
          <Allotment>
            <Allotment.Pane preferredSize={350} maxSize={350} minSize={155}>
              <MaterialWrapper
                settingKey={settingKey}
                categoryKey={categoryKey}
                onSettingChange={setSettingKey}
                onCategoryChange={setCategoryKey}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <EditArea />
            </Allotment.Pane>
            <Allotment.Pane preferredSize={300} maxSize={400} minSize={250}>
              <Setting value={settingKey} onChange={setSettingKey} />
            </Allotment.Pane>
          </Allotment>
        )}
        {mode === "preview" && <Preview components={components} />}
        {mode === "project" && <Projects />}
      </Allotment>
    </div>
  );
}
