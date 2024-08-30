import { useEffect, useRef } from "react";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(
    ["Button", "Container", "Modal", "Table", "Form"],
    id
  );

  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: "move",
      id: id
    }
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  return (
    <div
      ref={divRef}
      style={styles}
      data-component-id={id}
      className={`min-h-[60px] p-[10px] min-w-[100px] 
        ${
          canDrop ? "border-[1px] border-[blue]" : "border-[1px] border-[#ccc]"
        }`}
    >
      {children}
    </div>
  );
};

export default Container;
