import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

function Page({ id, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(
    ["Button", "Container", "Modal", "Table", "Form"],
    id
  );

  return (
    <div
      data-component-id={id}
      ref={drop}
      className="p-[20px] h-full box-border"
      style={{ ...styles, border: canDrop ? "1px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}

export default Page;
