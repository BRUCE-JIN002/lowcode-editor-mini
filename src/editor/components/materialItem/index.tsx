import { useDrag } from "react-dnd";
import { MaterialType } from "../../store/component-config";

import { createFromIconfontCN } from "@ant-design/icons";

export const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_4662074_xpfpvpzj1h.js"]
});

const IconMap: { [key: string]: any } = {
  [MaterialType.Container]: <IconFont type="icon-a-ziyuan35" />,
  [MaterialType.Button]: <IconFont type="icon-anniuzu" />,
  [MaterialType.Modal]: <IconFont type="icon-danchuang" />,
  [MaterialType.Table]: <IconFont type="icon-24gl-table" />,
  [MaterialType.TableColumn]: <IconFont type="icon-biaogeliebiao" />,
  [MaterialType.Form]: <IconFont type="icon-biaodan" />,
  [MaterialType.FormItem]: <IconFont type="icon-zujian-biaodanxiang" />
};

export interface MaterialItemProps {
  name: string;
  desc: string;
}

export default function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props;

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name
    }
  });

  return (
    <div
      ref={drag}
      className="
            py-[4px] px-[5px] m-[10px] cursor-move bg-white flex items-center gap-[4px] pl-3
            w-[130px] h-[30px] border rounded-[4px] border-[#e0e0e0] hover:border-blue-500 text-[12px]"
    >
      {IconMap[name]}
      {desc}
    </div>
  );
}
