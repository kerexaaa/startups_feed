"use client";
import React from "react";
import Button from "./Button";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";

const EditProfile = () => {
  const { open } = useEditProfileModal();

  return (
    <Button className="border-l-3 pl-3 text-red text-3xl" onClick={open}>
      Edit Profile
    </Button>
  );
};

export default EditProfile;
