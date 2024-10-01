import { create } from "zustand";
import { languageOptions } from "@/constants/languageOptions";

interface EditorState {
  code: string;
  customInput: string;
  outputDetails: string;
  processing: boolean;
  languageId: number;
  language: string;
}

interface EditorActions {
  setCode: (code: string) => void;
  setCustomInput: (customInput: string) => void;
  setOutputDetails: (outputDetails: string) => void;
  setProcessing: (processing: boolean) => void;
  setLanguageId: (languageId: number) => void;
  setLanguage: (language: string) => void;
}

type EditorStore = EditorState & EditorActions;

export const useEditorStore = create<EditorStore>((set) => ({
  code: "",
  customInput: "",
  outputDetails: "",
  processing: false,
  languageId: languageOptions[0].id,
  language: languageOptions[0].value,

  setCode: (code) => set({ code }),
  setCustomInput: (customInput) => set({ customInput }),
  setOutputDetails: (outputDetails) => set({ outputDetails }),
  setProcessing: (processing) => set({ processing }),
  setLanguageId: (languageId) => set({ languageId }),
  setLanguage: (language) => set({ language }),
}));