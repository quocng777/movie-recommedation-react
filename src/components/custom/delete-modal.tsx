import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "../ui/dialog";


interface DeleteModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onDelete: () => void; 
  content?: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  content,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-10" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
          <DialogTitle className="text-xl font-bold text-red-700 mb-4 text-center">
            Confirm Deletion
          </DialogTitle>
          <p className="text-gray-300 text-center mb-6">
            {content || "Are you sure you want to delete this?"}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant={"ghost"}
              onClick={onClose}
              className="px-4 py-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              onClick={onDelete}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteModal;
