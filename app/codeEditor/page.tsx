'use client';

import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { CompileAndExecute } from "@/components/CompileAndExecute";
import { InputField } from "@/components/InputField";
import { LanguageSelection } from "@/components/LanguageSelection";
import { OutputField } from "@/components/OutputField";
import { ChatBot } from "@/components/ChatBot";

export default function CodeEditorPage() {
  const [showChatBot, setShowChatBot] = useState(false);

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
    <div className="w-full flex relative">
      <div className="w-1/2">
        <CodeEditor />
      </div>
      <div className="w-1/2 p-6 space-y-6">
        <LanguageSelection />
        <InputField />
        <OutputField />
        <CompileAndExecute />
      </div>
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
}