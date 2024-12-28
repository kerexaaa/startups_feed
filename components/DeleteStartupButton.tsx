"use client";

import React from "react";
import Button from "./Button";
import { deleteStartup } from "@/utils/actions";
import { toast } from "react-toastify";

const DeleteStartupButton = ({ _id }: { _id: string }) => {
  const handleClick = async () => {
    try {
      const res = await deleteStartup(_id);

      toast.success("Startup is going to be deleted in few minutes!");
      location.reload();
      return res;
    } catch (error) {
      toast.error("Unexpected error, try later...");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="text-white bg-red py-2 px-6 text-lg rounded-full hover:bg-red/50 transition ease-in-out"
    >
      Delete
    </Button>
  );
};

export default DeleteStartupButton;
