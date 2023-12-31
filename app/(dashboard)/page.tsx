"use client";

import { Loader } from "@/components/Loader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/queries/items";
import CreateItemModal from "@/components/modal/item/CreateItemModal";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PdfReport from "@/components/pdfReport";
import useCurrentUser from "@/components/hooks/useCurrentUser";

const Home = () => {
  const { data, isPending } = useCurrentUser();

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
          {/* <PDFViewer>
            <PdfReport items={itemsQuery.data} />
          </PDFViewer> */}
          {data && (
            <Button variant={"secondary"} asChild>
              <PDFDownloadLink
                document={
                  <PdfReport items={itemsQuery.data} name={data.name} />
                }
                fileName={`${data.name}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "export to pdf"
                }
              </PDFDownloadLink>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          {isCreateModalOpen ? (
            <CreateItemModal
              isOpen={isCreateModalOpen}
              onClose={() => setCreateModalOpen(false)}
            />
          ) : null}
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
