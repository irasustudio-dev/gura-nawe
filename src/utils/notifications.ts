import { Toaster, toast } from 'sonner';
export { toast };

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      theme="system"
      richColors
      closeButton
      expand={true}
      visibleToasts={3}
    />
  );
}

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
