import React from "react";

export default function DeleteConfirmationDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-confirmation-dialog">
      <div className="delete-confirmation-content">
        <p>Are you sure you want to delete this post?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
