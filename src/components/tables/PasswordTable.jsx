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
import SelectInput from "../SelectInput";
import PasswordSkeleton from "../Skeletons/PasswordSkeleton";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import InvisiblePassword from "./InvisiblePassword";
export default function PasswordTable({ other = false }) {
  const { currentUser } = UseAuth();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("passwords", {
      myPassword: currentUser?.email,
    });
  const {
    items: ohterPassword,
    loading: loading2,
    nextPage: nextPage2,
    prevPage: prevPage2,
    hasNext: hasNext2,
    hasPrev: hasPrev2,
  } = usePaginatedDocs("passwords", {
    roleAccess: currentUser?.email,
  });

  if (other) {
    return (
      <div>
        <div className="min-h-[40vh]">
          <Table className="w-full text-[1rem]">
            <TableCaption>A list of passwords</TableCaption>
            <TableHeader className="bg-gray-200/55 !rounded-lg">
              <TableRow className="">
                <TableHead className="w-[100px]">Logo</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Creator</TableHead>
              </TableRow>
            </TableHeader>
            {loading2 ? (
              <PasswordSkeleton type="all" />
            ) : (
              <TableBody>
                {ohterPassword?.map((password, id) => (
                  <TableRow key={id} className="">
                    <TableCell className="font-medium">
                      <a
                        href={password?.websiteLink}
                        target="_blank"
                        className="flex items-center gap-x-10 flex-1 cursor-pointer"
                      >
                        {password?.logo ? (
                          <img
                            className="w-[40px] h-auto"
                            src={password?.logo}
                            alt="company_logo"
                          />
                        ) : (
                          <div className="w-[40px] h-[40px] bg-gray-300 rounded-sm grid place-items-center text-black/20 text-xl">
                            x
                          </div>
                        )}
                      </a>
                    </TableCell>

                    <TableCell>
                      <a
                        className="cursor-pointer hover:underline text-blue-500"
                        target="_blank"
                        href={password?.websiteLink}
                      >
                        {password.username}
                      </a>
                    </TableCell>
                    <TableCell>
                      <InvisiblePassword password={password.password} />
                    </TableCell>

                    <TableCell className="w-[50px] ">
                      <div className="flex items-center gap-x-3">
                        {password?.creator?.name}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <div>
            {ohterPassword && ohterPassword.length < 1 && (
              <p className="text-xl font-bold text-center mt-40">
                There is no items
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-8 w-fit ml-auto">
          <Button
            className="cursor-pointer"
            onClick={prevPage2}
            disabled={!hasPrev2}
          >
            Prev
          </Button>
          <Button
            className="cursor-pointer"
            onClick={nextPage2}
            disabled={!hasNext2}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="min-h-[40vh]">
        <Table className="w-full text-[1rem]">
          <TableCaption>A list of passwords</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow className="">
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <PasswordSkeleton />
          ) : (
            <TableBody>
              {items?.map((password, id) => (
                <TableRow key={id} className="">
                  <TableCell className="font-medium">
                    <a
                      target="_blank"
                      href={password?.websiteLink}
                      className="flex items-center gap-x-10 flex-1 "
                    >
                      {password?.logo ? (
                        <img
                          className="w-[40px] h-auto"
                          src={password?.logo}
                          alt="company_logo"
                        />
                      ) : (
                        <div className="w-[40px] h-[40px] bg-gray-300 rounded-sm grid place-items-center text-black/20 text-xl">
                          x
                        </div>
                      )}
                    </a>
                  </TableCell>

                  <TableCell>
                    <a
                      className="cursor-pointer hover:underline text-blue-500"
                      target="_blank"
                      href={password?.websiteLink}
                    >
                      {password.username}
                    </a>
                  </TableCell>
                  <TableCell>
                    <InvisiblePassword password={password.password} />
                  </TableCell>
                  <TableCell className="w-[130px]">
                    <SelectInput
                      selectPlaceholder={`View Access - ${
                        password?.access.length < 10
                          ? "0" + password?.access.length
                          : password?.access.length
                      }`}
                      selectlist={password?.access}
                    />
                  </TableCell>
                  <TableCell className="w-[50px] ">
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
          )}
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
