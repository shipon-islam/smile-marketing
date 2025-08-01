import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseAuth } from "@/firebase/auth";
import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import InvisiblePassword from "./InvisiblePassword";
export default function PasswordTable() {
  const { currentUser } = UseAuth();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("passwords", {
      roleAccess: currentUser?.role === "team" ? true : false,
    });
  if (currentUser?.role === "team") {
    return (
      <div>
        <div className="min-h-[50vh]">
          <Table className="w-full text-[1rem]">
            <TableCaption>A list of providers</TableCaption>
            <TableHeader className="bg-gray-200/55 !rounded-lg">
              <TableRow className="">
                <TableHead className="w-[100px]">Logo</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Password</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((password, id) => (
                <TableRow key={id} className="">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-x-10 flex-1 ">
                      <img
                        className="w-[40px] h-auto"
                        src={password?.logo}
                        alt="company_logo"
                      />
                    </div>
                  </TableCell>

                  <TableCell>{password.username}</TableCell>
                  <TableCell>
                    <InvisiblePassword password={password.password} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            {items && items.length < 1 && (
              <p className="text-xl font-bold text-center mt-40">
                There is no items
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
  return (
    <div>
      <div className="min-h-[50vh]">
        <Table className="w-full text-[1rem]">
          <TableCaption>A list of providers</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow className="">
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((password, id) => (
              <TableRow key={id} className="">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-x-10 flex-1 ">
                    <img
                      className="w-[40px] h-auto"
                      src={password?.logo}
                      alt="company_logo"
                    />
                  </div>
                </TableCell>

                <TableCell>{password.username}</TableCell>
                <TableCell>
                  <InvisiblePassword password={password.password} />
                </TableCell>
                <TableCell className="w-[130px]">
                  <div className="flex gap-x-1">
                    {password?.access.map((access, index) => (
                      <button
                        className="bg-[#E6E7EA] px-2 py-1 rounded-full cursor-pointer text-sm"
                        key={index}
                      >
                        {access}
                      </button>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="w-[50px]">
                  <div className="flex items-center gap-x-3">
                    <DeleteModal
                      collectionName="passwords"
                      id={password?.id}
                      imageUrl={password?.logo}
                      refetch={refetch}
                    />
                    <Link
                      to={`/dashboard/edit-password/${password.id}`}
                      state={{ password }}
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
              There is no items
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
