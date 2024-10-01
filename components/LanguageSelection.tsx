import { Select } from "@mantine/core";
import { languageOptions } from "@/constants/languageOptions";
import { useEditorStore } from "@/store/editorStore";
import { useCallback } from "react";

export const LanguageSelection = () => {
  const { languageId, setLanguageId, setLanguage } = useEditorStore();

  const handleOnChange = useCallback((value: string | null) => {
    if (value) {
      const selectedLanguage = languageOptions.find((option) => option.value === value);
      if (selectedLanguage && selectedLanguage.id !== languageId) {
        setLanguageId(selectedLanguage.id);
        setLanguage(value);
      }
    }
  }, [languageId, setLanguageId, setLanguage]);

  return (
    <div className="max-w-sm">
      <Select
        label="Select Language"
        placeholder="Choose programming language"
        data={languageOptions}
        value={languageOptions.find(option => option.id === languageId)?.value || ""}
        onChange={handleOnChange}
      />
    </div>
  );
};