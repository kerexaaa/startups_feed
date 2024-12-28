"use client";

import Form from "next/form";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { FiSend } from "react-icons/fi";
import { formSchema, validateEdit } from "@/validation";
import Button from "./Button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createStartup } from "@/utils/actions";
import { toast } from "react-toastify";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (prev: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: value,
      };

      await validateEdit(formValues);
      console.log(formSchema);

      const res = await createStartup(prev, formData, value);

      if (res.status == "success") {
        toast.success(
          "that's what i'm talking about! startup has been created!",
          {
            autoClose: 10000,
          }
        );

        console.log(res);

        router.push(`/startup/${res._id}`);
      }
      console.log(formValues);
      return res;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("just make sure you wrote everything right", {
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
    <Form action={dispatch} className="py-12 px-8">
      <div>
        <label htmlFor="title" className="uppercase font-bold text-lg">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="mt-3 mb-4 transition rounded-full border-3 border-black py-6 px-6 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Startup title"
        />
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="uppercase font-bold text-lg">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="mt-3 mb-4 transition rounded-xl border-3 border-black py-6 px-6 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Startup description"
        />
        {errors.description && <p className="text-red">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="uppercase font-bold text-lg">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="mt-3 mb-4 transition rounded-full border-3 border-black py-6 px-6 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Startup category (Tech, Education, News)"
        />
        {errors.category && <p className="text-red">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className="uppercase font-bold text-lg">
          Image url
        </label>
        <Input
          id="link"
          name="link"
          className="mt-3 mb-4 transition rounded-full border-3 border-black py-6 px-6 !text-lg placeholder:text-lg placeholder:font-bold font-bold focus:outline-none focus:border-none"
          required
          placeholder="Startup image URL"
        />
        {errors.link && <p className="text-red">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="uppercase font-bold text-lg">
          pitch
        </label>
        <MDEditor
          value={value}
          onChange={(value) => setValue(value || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Describe your startup with a pitch!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="text-red">{errors.pitch}</p>}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="transition hover:bg-pink/50 bg-pink border-5 flex items-center justify-center border-black w-full mt-10 p-3 rounded-full"
      >
        {isPending ? "Submitting..." : "Create!"}
        <FiSend size={24} className="ml-2" />
      </Button>
    </Form>
  );
};

export default StartupForm;
