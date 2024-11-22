import React from "react";
import { useComponentsStore } from "../stores/components";

export default function Setting() {
  const { components } = useComponentsStore();

  return <div className="h-[100%] overflow-auto">
    <pre>
      {JSON.stringify(components, null, 2)}
    </pre>
  </div>
}
