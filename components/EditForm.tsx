"use client";

import Form from "next/form";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Button from "./Button";
import { FiSend } from "react-icons/fi";

const EditForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isPending = false;

  

  return (
    <Form action={"dispatch"}>
      <div>
        <label htmlFor="name" className="uppercase font-bold text-lg">
          Name
        </label>
        <Input
          id="name"
          name="name"
          className="mt-3 mb-4 transition rounded-full border-3 border-black p-3 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Your name"
        />
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="link" className="uppercase font-bold text-lg">
          Image url
        </label>
        <Input
          id="link"
          name="link"
          className="mt-3 mb-4 transition rounded-full border-3 border-black p-3 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Profile image"
        />
        {errors.link && <p className="text-red">{errors.link}</p>}
      </div>
      <div>
        <label htmlFor="username" className="uppercase font-bold text-lg">
          Username
        </label>
        <Input
          id="username"
          name="username"
          className="mt-3 mb-4 transition rounded-full border-3 border-black p-3 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Your username"
        />
        {errors.category && <p className="text-red">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="bio" className="uppercase font-bold text-lg">
          Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          className="mt-3 mb-4 transition rounded-xl border-3 border-black p-3 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Your bio"
        />
        {errors.description && <p className="text-red">{errors.description}</p>}
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="transition hover:bg-pink/50 bg-pink border-5 flex items-center justify-center border-black w-full mt-5 p-3 rounded-full"
      >
        {isPending ? "Updating..." : "Update!"}
        <FiSend size={24} className="ml-2" />
      </Button>
    </Form>
  );
};

export default EditForm;
