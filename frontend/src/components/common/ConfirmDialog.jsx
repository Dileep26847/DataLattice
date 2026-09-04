import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}) {

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
    >

      <p className="text-slate-600 leading-7">

        {message}

      </p>

      <div className="flex justify-end gap-4 mt-8">

        <Button
          variant="secondary"
          onClick={onClose}
        >

          {cancelText}

        </Button>

        <Button
          variant={danger ? "danger" : "primary"}
          onClick={onConfirm}
        >

          {confirmText}

        </Button>

      </div>

    </Modal>

  );

}

export default ConfirmDialog;