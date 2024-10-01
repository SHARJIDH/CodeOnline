import { useEditorStore } from "@/store/editorStore";
import { Button } from "@mantine/core";
import { useState, useCallback } from "react";

export const CompileAndExecute = () => {
  const [processing, setProcessing] = useState(false);
  const { languageId, code, customInput, setOutputDetails } = useEditorStore();

  const checkStatus = useCallback(async (submissionId: string) => {
    const result = await fetch(
      `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=true&fields=*`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_JUDGE0_API_KEY!,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
    const resultData = await result.json();
    if (resultData.status.id <= 2) {
      setTimeout(() => checkStatus(submissionId), 1000);
    } else {
      setOutputDetails(
        resultData.stdout || resultData.stderr || resultData.compile_output
      );
      setProcessing(false);
    }
  }, [setOutputDetails]);

  const handleOnClick = useCallback(async () => {
    setProcessing(true);
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_JUDGE0_API_KEY!,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: btoa(code),
          stdin: btoa(customInput),
        }),
      }
    );
    const data = await response.json();
    const submissionId = data.token;
    checkStatus(submissionId);
  }, [languageId, code, customInput, checkStatus]);

  return (
    <div className="flex justify-end">
      <Button
        color="dark"
        radius="xl"
        loading={processing}
        onClick={handleOnClick}
      >
        Compile and Execute
      </Button>
    </div>
  );
};