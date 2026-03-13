function DeleteAccountModel({ onClose }) {
  const handleDelete = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-3 text-[#D8581C]">
          Delete Account
        </h2>

        <p className="text-sm mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          {/* Cancel button. */}
          <button
            onClick={onClose}
            className="px-3 py-1 cursor-pointer rounded bg-gray-200 hover:bg-[#BFBFBF]"
          >
            Cancel
          </button>

          {/* Delete button. */}
          <button
            onClick={handleDelete}
            className="px-3 py-1 cursor-pointer rounded bg-[#D8581C] text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModel;
