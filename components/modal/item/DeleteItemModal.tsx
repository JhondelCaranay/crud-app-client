"use client";

import { Item, deleteItem } from "@/queries/items";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};
const DeleteItemModal = ({ item, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteItem(item.id),
  });

  const onSubmit = async () => {
    mutation.mutate(undefined, {
      onSuccess() {
        toast.success(`Item has been deleted`);
        queryClient.invalidateQueries({
          queryKey: ["items"],
        });
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the item permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} asChild>
            <AlertDialogAction
              className="bg-red-600"
              onClick={() => onSubmit()}
            >
              Confirm
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteItemModal;
