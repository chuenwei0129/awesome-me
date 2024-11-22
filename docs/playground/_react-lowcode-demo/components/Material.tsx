import { useMemo } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import React from "react";
import { useDrag } from "react-dnd";

const ComponentItem = ({ name }: { name: string }) => {
  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name
    }
  });

  return (
    <div
      ref={drag}
      className="border-dashed border-[1px] border-[#000] py-[8px] px-[10px] m-[10px] cursor-move inline-block bg-white hover:bg-[#ccc]"
    >
      {name}
    </div>
  )
}

export default function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => Object.values(componentConfig), [componentConfig]);

  return (
    <div>
      {components.map((item) => (
        <ComponentItem key={item.name} name={item.name} />
      ))}
    </div>
  );
}

