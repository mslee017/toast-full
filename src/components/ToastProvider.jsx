import React, { useEffect } from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'Info Toast!',
      variant: 'info',
    },
    {
      id: crypto.randomUUID(),
      message: 'Success Toast!',
      variant: 'success',
    },
    {
      id: crypto.randomUUID(),
      message: 'Warning Toast!',
      variant: 'warning',
    },
  ]);

  function createToast(message, variant) {
    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
  }

  function dismissToast(id) {
    const filteredToasts = toasts.filter(toast => toast.id !== id);
    setToasts(filteredToasts);
  }

  function handleEscClose(event) {
    if (toasts.length > 0) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
      return;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);

    return () => window.removeEventListener(onkeydown, handleEscClose);
  }, [handleEscClose]);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
