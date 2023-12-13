import UpdateItemModal from "@/components/modal/item/UpdateItemModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item } from "@/queries/items";

import { Archive, MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";

type Props = {
  data: Item;
};
const ActionCell = ({ data }: Props) => {
  const [isUpdateModalOpen, setUpdateModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="flex justify-end">
      {isUpdateModalOpen ? (
        <UpdateItemModal
          item={data}
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModal(false)}
        />
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setUpdateModal(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 hover:!text-red-600 hover:!bg-red-100 ">
            <Archive className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ActionCell;
