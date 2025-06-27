import { useRef, useCallback } from 'react';
import { Upload, CloudUpload, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePDF } from '@/hooks/use-pdf';

export default function PDFViewer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    file,
    isLoading,
    error,
    currentPage,
    totalPages,
    zoom,
    uploadFile,
    nextPage,
    previousPage,
    zoomIn,
    zoomOut,
  } = usePDF();

  const handleFileSelect = useCallback((selectedFile: File) => {
    uploadFile(selectedFile);
  }, [uploadFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary', 'bg-blue-50');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary', 'bg-blue-50');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary', 'bg-blue-50');
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 text-primary mx-auto mb-4" />
          <p className="text-slate-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CloudUpload className="text-3xl text-slate-400 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Upload Your PDF</h2>
          <p className="text-slate-600 mb-8">Select a PDF document to start analyzing and discussing its contents</p>
          
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-primary hover:bg-blue-50 transition-all cursor-pointer group"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="text-center">
              <FileText className="text-4xl text-slate-400 group-hover:text-primary transition-colors mb-4 w-16 h-16 mx-auto" />
              <p className="text-lg font-medium text-slate-700 mb-2">Drop your PDF here or click to browse</p>
              <p className="text-sm text-slate-500">Supports PDF files up to 10MB</p>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <Button 
            onClick={handleUploadClick}
            className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Upload className="mr-2 w-4 h-4" />
            Choose File
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* PDF Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={zoomOut} className="text-slate-600 hover:text-slate-900">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-slate-600 min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="sm" onClick={zoomIn} className="text-slate-600 hover:text-slate-900">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-slate-300" />
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={previousPage}
            disabled={currentPage <= 1}
            className="text-slate-600 hover:text-slate-900 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="text-slate-600 hover:text-slate-900 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto bg-slate-100 p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div 
            className="aspect-[8.5/11] bg-white border border-slate-200 rounded-lg p-8"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          >
            <div className="h-full bg-slate-50 rounded border-2 border-dashed border-slate-200 flex items-center justify-center">
              <div className="text-center">
                <FileText className="text-4xl text-slate-300 mb-2 w-16 h-16 mx-auto" />
                <p className="text-slate-500 font-medium">{file.name}</p>
                <p className="text-xs text-slate-400 mt-1">PDF Content will render here</p>
                <p className="text-xs text-slate-400">React-PDF integration needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
