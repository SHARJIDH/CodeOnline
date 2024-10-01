'use client';

import { useEditorStore } from "@/store/editorStore";
import { useCallback } from "react";

export const InputField = () => {
  const { customInput, setCustomInput } = useEditorStore();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomInput(event.currentTarget.value);
  }, [setCustomInput]);

  return (
    <div className="w-full">
      <label htmlFor="custom-input" className="block text-sm font-medium text-gray-700 mb-1">
        Custom Input
      </label>
      <textarea
        id="custom-input"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your input here"
        value={customInput}
        onChange={handleInputChange}
        rows={4}
      />
    </div>
  );
};