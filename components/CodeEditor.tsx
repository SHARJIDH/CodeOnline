'use client';

import { useEditorStore } from "@/store/editorStore";
import MonacoEditor from "@monaco-editor/react";
import { useCallback, useState, useEffect } from "react";
import { ChatBot } from "@/components/ChatBot";

export const CodeEditor = () => {
  const { code, setCode, language } = useEditorStore();
  const [showChatBot, setShowChatBot] = useState(false);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  }, [setCode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setShowChatBot(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
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
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </>
  );
};