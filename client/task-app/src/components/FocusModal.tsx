import { type ReactNode } from "react";

//this are the states of the modal, isOpen indicate what it name says. onClose
//will be a method that close the modal of course
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  //this would be the modal
  return (
    <>
      {/* Backdrop make the background black and add a blur*/}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content center the container*/}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        {/* Container that have the child*/}
        <div className="p-4 rounded-xl shadow-lg max-w-xl w-full">
          {children}
        </div>
      </div>
    </>
  );
}
