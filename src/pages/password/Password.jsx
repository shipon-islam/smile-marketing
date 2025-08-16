import PasswordTable from "@/components/tables/PasswordTable";
import { Link } from "react-router-dom";

export default function Password() {
  return (
    <div className="">
      <div className={`bg-white p-4 md:p-8 rounded-lg`}>
        <div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center my-6">
            <h4 className="font-medium text-2xl capitalize sm:mb-4 mt-8 sm:mt-0">
              my passwords
            </h4>
            <Link
              to="/dashboard/create-password"
              className="bg-deepBlue text-white px-8 py-2 capitalize font-medium rounded-md w-fit"
            >
              create new password
            </Link>
          </div>

          <PasswordTable />
        </div>
      </div>
      <div className={`bg-white p-4 md:p-8 rounded-lg mt-4`}>
        <div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center my-6">
            <h4 className="font-medium text-2xl capitalize sm:mb-4 mt-8 sm:mt-0">
              all passwords
            </h4>
          </div>
          <PasswordTable other={true} />
        </div>
      </div>
    </div>
  );
}
