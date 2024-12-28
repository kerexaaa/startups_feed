"use client";

import EditForm from "./EditForm";
import Modal from "./Modal";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";

const EditModal = () => {
  const { isOpen, close } = useEditProfileModal();

  const onChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  return (
    <Modal
      description={""}
      isOpen={isOpen}
      onChange={onChange}
      title={"Update time!"}
    >
      <EditForm></EditForm>
    </Modal>
  );
};

export default EditModal;
