import ScrollArea from "@/components/ScrollArea";
import InvisiblePassword from "@/components/tables/InvisiblePassword";
import PasswordTable from "@/components/tables/PasswordTable";
import { UseAuth } from "@/firebase/auth";
import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import { Link } from "react-router-dom";

export default function Password() {
  const { currentUser } = UseAuth();
  const { items } = usePaginatedDocs("passwords", { isSelf: true });
  return (
    <div className="">
      <div className="bg-white px-1 py-4 rounded-lg md:hidden">
        <h1 className="text-3xl font-semibold mb-2 pl-2">Passwords</h1>
      </div>
      <div className={`bg-white p-4 md:p-8 rounded-lg  order-2 xl:order-1`}>
        <h1 className="text-3xl font-semibold mb-8 hidden md:block">
          Passwords
        </h1>
        {currentUser?.role !== "team" && (
          <div>
            <h4 className="font-medium text-2xl capitalize mb-4">
              my passwords
            </h4>
            <ScrollArea className="max-h-[50vh] overflow-x-auto max-w-[80vw] sm:max-w-[85vw] xl:max-w-full">
              <ul className="w-full">
                {items?.map((password) => (
                  <li
                    className="flex justify-between gap-x-4 items-center bg-[#F7F7F7] mb-4 py-2 px-4 rounded-md w-[400px] sm:w-[400px] md:w-full"
                    key={password.id}
                  >
                    <div className="flex items-center gap-5">
                      <img
                        className="w-[50px] h-auto"
                        src={password.logo}
                        alt="company"
                      />
                      <h5>{password.username}</h5>
                    </div>
                    <InvisiblePassword password={password?.password} />
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}

        <div className="sm:mt-10">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center my-6">
            <h4 className="font-medium text-2xl capitalize sm:mb-4 mt-8 sm:mt-0">
              all passwords
            </h4>
            {currentUser?.role !== "team" && (
              <Link
                to="/dashboard/create-password"
                className="bg-deepBlue text-white px-8 py-2 capitalize font-medium rounded-md w-fit"
              >
                create new password
              </Link>
            )}
          </div>

          <PasswordTable />
        </div>
      </div>
    </div>
  );
}
