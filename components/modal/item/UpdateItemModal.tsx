import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Item, updateItem } from "@/queries/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};
const UpdateItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
});
const UpdateItemModal = ({ isOpen, onClose, item }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof UpdateItemSchema>) =>
      updateItem(values, item.id),
  });

  const form = useForm<z.infer<typeof UpdateItemSchema>>({
    resolver: zodResolver(UpdateItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateItemSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    mutation.mutate(values, {
      async onSuccess() {
        toast.success(`Item has been added`);
        await queryClient.invalidateQueries({
          queryKey: ["items"],
        });
        form.reset();
        onClose();
      },
      onError(error) {
        if (isAxiosError(error)) {
          const errorKeys = Object.keys(error.response?.data.errors);
          errorKeys.forEach((key: any) => {
            form.setError(key, {
              type: "manual",
              message:
                error.response?.data.errors[key] || "Something went wrong",
            });
          });
        }
      },
    });
  };

  const isDisabled = form.formState.isSubmitting || form.formState.isLoading;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        onClose();
        !isOpen && form.reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>add new item.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isDisabled}
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={isDisabled}
                    variant="outline"
                    onClick={() => {
                      form.reset();
                    }}
                    className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isDisabled} type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateItemModal;
