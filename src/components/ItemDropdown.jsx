import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useGetRealTimeDocs } from "@/hooks/useGetRealTimeDocs";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function ItemDropdown({ name, collectionName }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const { documents } = useGetRealTimeDocs(collectionName);
  const { deleteDocument } = useDeleteDocument();
  const handleDelete = async (id) => {
    await deleteDocument(id, collectionName);
  };
  return (
    <div className="sm:mt-12 relative">
      <button
        onClick={() => setIsDropDown((prev) => !prev)}
        className="border px-4 py-2.5 rounded-md flex items-center justify-between gap-2 w-full font-medium"
      >
        <span>{name}</span>
        <Icon
          icon={isDropDown ? "oui:arrow-up" : "oui:arrow-down"}
          width="18"
          height="18"
        />
      </button>
      {isDropDown && (
        <div className="absolute top-12 w-full z-20">
          <ScrollArea className="shadow bg-white h-48">
            {documents?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 px-4 py-1.5 hover:bg-light"
              >
                <span className="capitalize">{item.name}</span>
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <Icon
                    icon="material-symbols:delete-rounded"
                    className="text-red-500 hover:text-red-400"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
