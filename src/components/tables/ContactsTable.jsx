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
import ContactsSkeleton from "../Skeletons/ContactsSkeleton";
import { Button } from "../ui/button";
export default function ContactsTable() {
  const { items, loading, nextPage, prevPage, hasNext, hasPrev } =
    usePaginatedDocs("checkout-requests");

  return (
    <div>
      <div>
        <h1 className="font-medium text-2xl capitalize mb-5">
          All Contacts List
        </h1>
      </div>
      <div className="min-h-[60vh]">
        <Table className="w-full text-[1rem] ">
          <TableCaption>A list of contacts paper</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow>
              <TableHead className="min-w-[200px]">Contacts PDF</TableHead>
              <TableHead>Product Details</TableHead>
              <TableHead>Requested User Details</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <ContactsSkeleton />
          ) : (
            <TableBody>
              {items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div>
                      <iframe
                        className="w-[220px] h-[200px]  rounded-lg object-cover border border-gray-200"
                        src={item.contactsPdf}
                        title="PDF Viewer"
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <ul className="capitalize">
                      <li className="text-wrap">{item?.inventory?.name}</li>
                      <li>price: $ {item?.inventory?.price}</li>
                      <li>Category: {item?.inventory?.category}</li>
                      <li>Brand: {item?.inventory?.brand}</li>
                    </ul>
                  </TableCell>

                  <TableCell>
                    <ul>
                      <li>{item?.requestBy.name}</li>
                      <li>{item?.requestBy.email}</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <a
                      href={item.contactsPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-500"
                    >
                      View PDF
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <div>
          {items && items.length < 1 && (
            <p className="text-xl font-bold text-center mt-40">
              There is no contacts
            </p>
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
