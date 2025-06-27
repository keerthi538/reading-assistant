import Navbar from '@/components/navbar';
import PDFViewer from '@/components/pdf-viewer';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex h-[calc(100vh-73px)]">
        <PDFViewer />
        <ChatInterface />
      </div>
    </div>
  );
}
