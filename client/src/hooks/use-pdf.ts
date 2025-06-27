import { useState, useCallback } from 'react';

export interface PDFState {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  zoom: number;
}

export function usePDF() {
  const [state, setState] = useState<PDFState>({
    file: null,
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    zoom: 1.0,
  });

  const uploadFile = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      setState(prev => ({ ...prev, error: 'Please select a valid PDF file' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setState(prev => ({ ...prev, error: 'File size must be less than 10MB' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Simulate loading time
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        file, 
        isLoading: false,
        currentPage: 1,
        totalPages: 10 // This would be set by react-pdf onLoadSuccess
      }));
    }, 1500);
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setTotalPages = useCallback((total: number) => {
    setState(prev => ({ ...prev, totalPages: total }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState(prev => ({ ...prev, zoom }));
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages) 
    }));
  }, []);

  const previousPage = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentPage: Math.max(prev.currentPage - 1, 1) 
    }));
  }, []);

  const zoomIn = useCallback(() => {
    setState(prev => ({ ...prev, zoom: Math.min(prev.zoom + 0.25, 3.0) }));
  }, []);

  const zoomOut = useCallback(() => {
    setState(prev => ({ ...prev, zoom: Math.max(prev.zoom - 0.25, 0.5) }));
  }, []);

  return {
    ...state,
    uploadFile,
    setCurrentPage,
    setTotalPages,
    setZoom,
    nextPage,
    previousPage,
    zoomIn,
    zoomOut,
  };
}
