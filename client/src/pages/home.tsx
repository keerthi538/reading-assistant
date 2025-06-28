import Navbar from "@/components/navbar";
import PDFViewer from "@/components/pdf-viewer";
import ChatInterface from "@/components/chat-interface";
import { useState } from "react";

export default function Home() {
  const [selectedText, setSelectedText] = useState("");

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex h-[calc(100vh-73px)]">
        <PDFViewer handleTextSelection={handleTextSelection} />
        <ChatInterface />
      </div>
    </div>
  );
}
