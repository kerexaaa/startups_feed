"use client";
import { createContext, useContext, useState } from "react";

type AuthModalContextType = {
  isOpen: boolean;
  isSignUp: boolean;
  open: () => void;
  close: () => void;
  changeModal: (state: boolean) => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export const MyAuthModalContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const changeModal = (state: boolean) => setIsSignUp(state);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, open, close, changeModal, isSignUp }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error(
      "useAuthModal must be used within a MyAuthModalContextProvider"
    );
  }
  return context;
};
