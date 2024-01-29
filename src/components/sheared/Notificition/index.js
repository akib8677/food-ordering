"use client"
import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const ToastVariantSuccess = ({ title, message }) => {
  return (
    <div className=" bg-gray-900 p-1 rounded-md">
      <p className="font-medium text-white">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  );
};

const ToastVariantError = ({ title, message }) => {
  return (
    <div className=" bg-gray-900 p-1">
      <p className="font-medium text-white">{title}</p>
      <p className="mt-1 text-gray-500">{message}</p>
    </div>
  );
};

export const notify = (props) => {
  toast.custom((t) => <ToastVariantSuccess {...props}/>)
}

export const success = (props) => {
  toast.custom((t) => <ToastVariantSuccess {...props}/>)
}

export const error = (props) => {
  toast.custom((t) => <ToastVariantError {...props}/>)
}

const AppContext = createContext({});

export const NotificationProvider = ({children}) => {
  return (
    <AppContext.Provider
      value={{notify,success,error}}
    >
      {children}
      <Toaster/>
    </AppContext.Provider>
  )
}

export const useNotificationContext = () => {
  const appContextData = useContext(AppContext)
  if(!appContextData) {
    throw new Error("useNameSpaceContext must be used within the provider")
  }
  return appContextData;
}