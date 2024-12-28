"use client";
import AuthModal from "@/components/AuthModal";
import EditModal from "@/components/EditModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal></AuthModal>
      <EditModal></EditModal>
    </>
  );
};

export default ModalProvider;
