"use client";

import Form from "next/form";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Button from "./Button";
import { FiSend } from "react-icons/fi";
import { updateUser } from "@/utils/actions";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";
import { z } from "zod";
import { toast } from "react-toastify";
import { editSchema } from "@/validation";

const EditForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { close } = useEditProfileModal();

  const handleSubmit = async (prev: any, formData: FormData) => {
    try {
      const formValues = {
        name: formData.get("name") as string,
        link: formData.get("link") as string,
        username: formData.get("username") as string,
        bio: formData.get("bio") as string,
      };

      await editSchema.parseAsync(formValues);
      const res = await updateUser(prev, formData);
      console.log(formValues);

      if (res.status == "success") {
        toast.success("Information is going to be updated in few minutes...", {
          autoClose: 10000,
        });

        console.log(res);
        close();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("check the things you've wrote", {
          autoClose: 10000,
        });

        return { ...prev, error: "Validation failed", status: "error" };
      }
      toast.error("ugh... that was unexpected error, try a bit later", {
        autoClose: 10000,
      });

      return { ...prev, error: "Something went wrong", status: "error" };
    }
  };

  const [state, dispatch, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <Form action={dispatch}>
      <div>
        <label htmlFor="name" className="uppercase font-bold text-lg">
          Name
        </label>
        <Input
          id="name"
          name="name"
          className="mt-3 mb-4 transition rounded-full border-3 border-black p-3 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
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
