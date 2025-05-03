import React, { useState, useEffect } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from "react-syntax-highlighter/dist/esm/styles/prism";



const App = () => {

  // Dark/Light Mode State
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Language Options
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  // Google AI setup
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY
  });

  // Review Code Function
  const reviewCode = async () => {
    if (!code) return alert("Please enter code first");
    setResponse("")
    setLoading(true);
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Suggestions for improvement and best practices.
3️⃣ Step-by-step explanation.
4️⃣ Potential bugs or logical errors.
5️⃣ Syntax/runtime issues if any.
6️⃣ Solutions and recommendations.

Code:
${code}
`
    });
    setResponse(res.text);
    setLoading(false);
  };

  // Fix Code Function (NEW)
  const fixCode = async () => {
    if (!code) return alert("Please enter code first");
    setResponse("")
    setLoading(true);
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert programmer.
Please FIX the following ${selectedOption.value} code.
Only output the corrected version without any extra explanation:

${code}
`
    });
    setResponse(res.text);
    setLoading(false);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b',
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b',
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',
      color: '#fff',
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',
      width: "100%"
    }),
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87.5%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={customStyles}
            />
            <button
              onClick={fixCode}
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
            >
              Fix Code
            </button>
            <button
              onClick={reviewCode}
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
            >
              Review
            </button>
          </div>

          <Editor
            height="100%"
            theme={darkMode ? 'vs-dark' : 'light'}
            language={selectedOption.value}
            value={code}
            onChange={(e) => { setCode(e) }}
          />
        </div>

        <div
          className={`right overflow-scroll !p-[10px] w-[50%] h-[101%] transition-all
    ${darkMode
              ? 'bg-zinc-900 text-white'    // dark-mode classes
              : 'bg-white text-black'        // light-mode classes
            }`}
            >
          <div className="topTab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
          <p className='font-[700] text-[17px]'>Response</p>
        </div>
        {loading && <RingLoader color='#9333ea' />}
        {!loading && <Markdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={darkMode ? vscDarkPlus : prism}

                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}

        >{response}</Markdown>}
      </div>
    </div >
    </>
  )
}

export default App
