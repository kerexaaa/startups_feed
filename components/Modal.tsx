import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Modal = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="shadow-inner-red backdrop-blur-sm fixed inset-0">
          <Dialog.Content className="bg-gray-100 fixed drop-shadow-md border-none md:border border-pink rounded-none md:rounded-md top-1/2 left-1/2 max-h-full h-full -translate-x-1/2 -translate-y-1/2 md:h-auto md:max-h-[85dvh] w-full md:w-[90dvw] md:max-w-[28.125rem] p-6">
            <Dialog.Title className="text-3xl text-red text-center font-bold mb-4">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-md leading-normal text-center">
              {description}
            </Dialog.Description>
            <div className="flex flex-col justify-center">{children}</div>
            <Dialog.Close asChild>
              <button className="text-red hover:text-black absolute top-2 right-2 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:outline-none transition">
                <IoMdClose size={24} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
