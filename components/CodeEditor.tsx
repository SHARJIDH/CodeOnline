import { useEditorStore } from "@/store/editorStore";
import MonacoEditor from "@monaco-editor/react";
import { useCallback } from "react";

export const CodeEditor = () => {
  const { code, setCode, language } = useEditorStore();

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  }, [setCode]);

  return (
    <MonacoEditor
      height="100vh"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        padding: { top: 10 },
      }}
    />
  );
};