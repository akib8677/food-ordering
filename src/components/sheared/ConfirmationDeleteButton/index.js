import { useState } from "react";

const ConfirmationDeleteButton = ({ label, className, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p className="mb-6">Are you sure you want to delete?</p>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </button>
    </>
  );
};

export default ConfirmationDeleteButton;
