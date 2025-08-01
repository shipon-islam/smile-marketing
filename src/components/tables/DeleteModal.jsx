import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import useImageDelete from "@/hooks/useImageDelete";
import { Icon } from "@iconify/react";
export function DeleteModal({ id, collectionName, imageUrl, refetch }) {
  const { deleteDocument } = useDeleteDocument();
  const { deleteImage } = useImageDelete();
  const handleClick = async () => {
    if (id) {
      await deleteDocument(id, collectionName);
      if (imageUrl) {
        await deleteImage(imageUrl);
      }
    }
    if (refetch) {
      await refetch();
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="text-red-400 cursor-pointer mt-2">
            <Icon icon="material-symbols:delete" width="24" height="24" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Once deleted, the item will be
              permanently removed from your records.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleClick}
              className="cursor-pointer"
              variant="destructive"
              type="submit"
            >
              Delete Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
