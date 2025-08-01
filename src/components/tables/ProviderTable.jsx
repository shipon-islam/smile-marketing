import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function ProviderTable() {
  const [filters, setFilters] = useState({});
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("providers", filters);
  return (
    <div>
      <TableTopper
        isSelect={false}
        heading="Provider List"
        selectPlaceholder="Select role"
        selectlist={["Admin", "Team", "Guest"]}
        onSearch={(e) => setFilters({ search: e.toLowerCase() })}
        onSelect={(e) => console.log(e)}
      />
      <div className="min-h-[50vh]">
        <Table className="w-full text-[1rem] ">
          <TableCaption>A list of providers</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact info</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((provider, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium text-wrap capitalize">
                  {provider.name}
                </TableCell>
                {/* <TableCell>{request.clientName}</TableCell> */}
                <TableCell>{provider.company}</TableCell>
                <TableCell>
                  {provider.email}
                  <br />
                  {provider.phone}
                </TableCell>

                <TableCell>{provider.specialty}</TableCell>
                <TableCell>
                  <div className="flex gap-x-1.5">
                    {provider.tags.map((tag, index) => (
                      <span
                        className="bg-light p-2 rounded-lg text-gray-400 text-sm"
                        key={index}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <DeleteModal
                      id={provider.id}
                      collectionName="providers"
                      refetch={refetch}
                    />
                    <Link
                      to={`/dashboard/edit-provider/${provider.id}`}
                      state={{ provider }}
                      className="text-green-400 cursor-pointer"
                    >
                      <Icon icon="akar-icons:edit" width="24" height="24" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          {items && items.length < 1 && (
            <p className="text-xl font-bold text-center mt-40">
              There is no providers
            </p>
          )}
          {loading && (
            <div className="text-xl font-bold text-center mt-40 w-fit mx-auto flex gap-4">
              <Icon
                icon="eos-icons:bubble-loading"
                className="text-blue-500"
                width="32"
                height="32"
              />
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-8 w-fit ml-auto">
        <Button
          className="cursor-pointer"
          onClick={prevPage}
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Button
          className="cursor-pointer"
          onClick={nextPage}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
