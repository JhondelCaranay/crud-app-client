"use client";

import { Loader } from "@/components/Loader";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { isAxiosError } from "axios";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/queries/items";

const Home = () => {
  const { data: user, error, isPending } = useCurrentUser();

  const itemsQuery = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  if (itemsQuery.isError) {
    return <div>Error...</div>;
  }

  if (itemsQuery.isPending || isPending) {
    return <Loader />;
  }
  return (
    <div className="p-5">
      <div className="flex justify-between items-center space-x-2 pb-4">
        <h1 className="text-xl font-bold">ITEM</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:md:sm:grid-cols-4 gap-4 py-4">
        <Input
          name="search"
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(event) => {
            setGlobalFilter(String(event.target.value));
          }}
          className="w-full"
        />
      </div>
      <DataTable
        columns={columns}
        data={itemsQuery.data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};
export default Home;
