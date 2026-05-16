import { Toaster, toast } from 'sonner';
import React from 'react';

export { toast };

export const ToastProvider: React.FC = () => {
  return React.createElement(Toaster, {
    position: 'bottom-right' as const,
    theme: 'system' as const,
    richColors: true,
    closeButton: true,
    expand: true,
    visibleToasts: 3,
  });
};

export const notifySuccess = (message: string) => 
  toast.success(message);

export const notifyError = (message: string) => 
  toast.error(message);

export const notifyInfo = (message: string) => 
  toast.info(message);

export const notifyWarning = (message: string) => 
  toast.warning(message);

export const notifyLoading = (message: string) => 
  toast.loading(message);
