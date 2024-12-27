"use client";

import Modal from "./Modal";
import { useState } from "react";
import SignUp from "./SignUp";
import { useAuthModal } from "@/hooks/useAuthModal";
import Button from "./Button";
import SignIn from "./SignIn";

const AuthModal = () => {
  const { isOpen, close, isSignUp, changeModal } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  return (
    <Modal
      description={
        isSignUp ? "C'mon! This one is in need." : "Remember your password?"
      }
      isOpen={isOpen}
      onChange={onChange}
      title={isSignUp ? "Sign Up" : "Sign in"}
    >
      {isSignUp ? (
        <>
          <SignUp />
          <Button onClick={() => changeModal(false)} className="text-sm mt-4">
            hey, already have an account?
          </Button>
        </>
      ) : (
        <>
          <SignIn />
          <Button onClick={() => changeModal(true)} className="text-sm mt-4">
            hey, you don't have an account?
          </Button>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
