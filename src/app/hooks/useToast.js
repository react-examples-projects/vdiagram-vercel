import { toast } from "sonner";
import { useCallback } from "react";

export default function useToast() {
  const success = useCallback((message) => {
    toast.success(message);
  }, []);

  const error = useCallback((message) => {
    toast.error(message);
  }, []);

  const info = useCallback((message) => {
    toast.info(message);
  }, []);

  const warn = useCallback((message) => {
    toast.warning(message);
  }, []); 

  return {
    success,
    error,
    info,
    warn,
  };
}
