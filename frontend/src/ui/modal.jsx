import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-black opacity-50 z-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  function preventClose(e) {
    e.stopPropagation();
  }
  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses} onClick={onClose}>
        <div
          onClick={preventClose}
          className="max-w-lg mt-0 pt-0 relative space-y-4  "
        >
          <button
            className="absolute top-2 right-2 mt-4 bg-red mr-2"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
