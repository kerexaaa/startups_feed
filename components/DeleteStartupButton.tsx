"use client";

import React from "react";
import Button from "./Button";
import { deleteStartup } from "@/utils/actions";
import { toast } from "react-toastify";

const DeleteStartupButton = ({ _id }: { _id: string }) => {
  const handleClick = async () => {
    try {
      const res = await deleteStartup(_id);

      if (res.status == "success") {
        toast.success("Startup is going to be deleted in few minutes!");
      }
    } catch (error) {}
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
