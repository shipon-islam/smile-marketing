import { Icon } from "@iconify/react";
import InputBox from "../components/InputBox";
import ProviderTable from "../components/ProviderTable";

export default function Providers() {
  return (
    <div>
      <div className="bg-white p-4 md:p-8 rounded-lg  order-2 xl:order-1 ">
        <h1 className="text-3xl font-semibold mb-8">Providers</h1>
        <div className="2xl:w-[90%]">
          <h4 className="font-medium text-2xl capitalize mb-4">
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
            <button className="bg-deepBlue py-3 px-4  text-gray-200 cursor-pointer uppercase rounded-lg font-bold mt-8 block ml-auto">
              Add Provider
            </button>
          </form>
        </div>
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 w-full max-w-full md:max-w-[85%] 2xl:max-w-[89%] gap-y-4">
            <h4 className="font-medium text-2xl capitalize ">Provider list</h4>

            <div className="flex py-2 px-3 border border-gray-300 rounded-lg ">
              <input
                className="border-none outline-none w-full h-full block"
                type="text"
                placeholder="Search..."
              />
              <button>
                <Icon
                  icon="iconamoon:search-bold"
                  width="24"
                  height="24"
                  className="text-gray-300"
                />
              </button>
            </div>
          </div>
          <ProviderTable />
        </div>
      </div>
    </div>
  );
}
