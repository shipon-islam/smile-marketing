import { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import RequestBox from "../components/RequestBox";
import ScrollArea from "../components/ScrollArea";
import SummaryBox from "../components/SummaryBox";
export default function Inventory() {
  const [isPending, setisPending] = useState(false);
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-5">
        <SummaryBox
          title="items in storage"
          amount="$250,000"
          items="300 items"
        />
        <SummaryBox
          title="items checked out"
          amount="$11,500"
          items="105 items"
        />
      </div>
      <div className="mt-8">
        <div className="lg:hidden bg-deepBlue/5 rounded-full p-1 ">
          <div className="flex  gap-x-4 bg-deepBlue/10 border border-gray-200 w-fit ml-auto p-1.5 rounded-full">
            <button
              onClick={() => setisPending(false)}
              className={`toggle-btn ${
                isPending ? "" : "bg-deepBlue !text-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setisPending(true)}
              className={`toggle-btn ${
                isPending ? "bg-deepBlue !text-gray-300" : ""
              }`}
            >
              Pending
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_18rem] xl:grid-cols-[1fr_20rem] gap-x-5 mt-4 ">
          <div
            className={`bg-white px-3 sm:px-5 py-6 rounded-md shadow ${
              isPending ? "hidden  lg:block" : ""
            }`}
          >
            <h1 className="font-semibold text-2xl capitalize mb-5">
              internal inventory
            </h1>
            <InventoryTable />
          </div>
          <div
            className={`bg-white px-3 sm:px-5 py-6 rounded-md w-full shadow ${
              isPending ? "" : "hidden lg:block"
            }`}
          >
            <h4 className="font-semibold capitalize text-xl mb-4">
              pending checkouts
            </h4>
            <ScrollArea className="max-h-[35rem]">
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
              <RequestBox
                title="macBook pro"
                user="john Doe"
                date="june 25, 2025"
                location="new york"
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
