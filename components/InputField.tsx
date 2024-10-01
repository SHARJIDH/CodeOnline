import { useEditorStore } from "@/store/editorStore";
import { Textarea } from "@mantine/core";
import { useCallback } from "react";

export const InputField = () => {
  const { customInput, setCustomInput } = useEditorStore();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomInput(event.currentTarget.value);
  }, [setCustomInput]);

  return (
    <Textarea
      placeholder="Enter your input here"
      value={customInput}
      onChange={handleInputChange}
    />
  );
};