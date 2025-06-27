import { FileText, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <FileText className="text-white text-sm w-4 h-4" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">PDF Chat Analyzer</h1>
          <p className="text-xs text-slate-500">Analyze and discuss your documents</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}
