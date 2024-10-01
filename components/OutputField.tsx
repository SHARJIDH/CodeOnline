import { useEditorStore } from "@/store/editorStore";
import { useEffect, useState } from "react";

export const OutputField = () => {
  const { outputDetails } = useEditorStore();
  const [decodedOutput, setDecodedOutput] = useState("");

  useEffect(() => {
    setDecodedOutput(outputDetails ? atob(outputDetails) : "");
  }, [outputDetails]);

  return (
    <div className="w-full">
      <div className="p-2 font-mono text-gray-600 text-sm">Output</div>
      <div className="bg-gray-100 h-40 rounded-md w-full overflow-y-scroll">
        <div className="p-2 font-mono text-xs text-gray-700">{decodedOutput}</div>
      </div>
    </div>
  );
};