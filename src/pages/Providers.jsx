import { useState } from "react";
import InputBox from "../components/InputBox";
import ProviderTable from "../components/tables/ProviderTable";

export default function Providers() {
  const [isPending, setisPending] = useState(false);
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg">
      <h1 className="text-3xl font-semibold mb-8">Providers</h1>
      <div className="md:hidden bg-deepBlue/5 rounded-full p-1 ">
        <div className="flex  gap-x-4 bg-deepBlue/10 border border-gray-200 w-fit ml-auto p-1.5 rounded-full">
          <button
            onClick={() => setisPending(false)}
            className={`toggle-btn ${
              isPending ? "" : "bg-deepBlue !text-gray-300"
            }`}
          >
            Provider list
          </button>
          <button
            onClick={() => setisPending(true)}
            className={`toggle-btn ${
              isPending ? "bg-deepBlue !text-gray-300" : ""
            }`}
          >
            Create provider
          </button>
        </div>
      </div>
      <div className={`mt-6 md:mt-0 ${isPending ? "" : "hidden  md:block"}`}>
        <h4 className="font-medium text-2xl capitalize mb-10">
          Create Provider
        </h4>
        <form action="#">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputBox label="Name" type="text" />
            <InputBox label="Company" type="text" />
            <InputBox label="Specialty" type="text" />
            <InputBox label="Email" type="text" />
            <InputBox label="Phone Number" type="text" />
            <InputBox label="Tags" type="text" />
          </div>
          <button className="bg-deepBlue py-2 px-5  text-gray-200 cursor-pointer uppercase rounded-lg font-medium mt-8 block ml-auto">
            Add Provider
          </button>
        </form>
      </div>
      <div className={`mt-6 md:mt-20 ${isPending ? "hidden  md:block" : ""}`}>
        <ProviderTable />
      </div>
    </div>
  );
}
