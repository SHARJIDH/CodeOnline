import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  const { messages, code ,language} = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are an AI assistant helping with coding. The current code is:

      ${code}
    in language ${language}
    users current interactions :

      ${messages}
      and
      The user's question or request is:

      ${messages[messages.length - 1].content}
    

      Please provide a helpful response, and if necessary, suggest changes to the code.
      just give me code nothing else that too line by line. always give complete code of the file. for example in c++ give std namespace and all also, just give code no quations and all like for example dont give like cpp and all text
      dont forget to give full code only like std , imports everything

      
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Here you would parse the response to extract any code changes
    // For simplicity, we're just sending back the full response
    // In a real implementation, you'd want to parse this more carefully

    return NextResponse.json({ response, updatedCode: null });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}