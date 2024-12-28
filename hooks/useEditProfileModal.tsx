"use client";
import { createContext, useContext, useState } from "react";

type EditProfileModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const EditProfileModalContext = createContext<
  EditProfileModalContextType | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
}

export const MyEditProfileModalContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <EditProfileModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </EditProfileModalContext.Provider>
  );
};

export const useEditProfileModal = () => {
  const context = useContext(EditProfileModalContext);
  if (!context) {
    throw new Error(
      "useEditProfileModal must be used within a MyEditProfileModalContextProvider"
    );
  }
  return context;
};
