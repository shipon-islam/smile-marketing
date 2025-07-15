import RequestBox from "./RequestBox";
import { ScrollArea } from "./ui/scroll-area";

export default function Notification() {
  return (
    <div className={`bg-white px-3 sm:px-5 py-6 rounded-md w-full shadow`}>
      <h4 className="font-semibold capitalize text-xl mb-4">
        Recent Notifications
      </h4>
      <ScrollArea className="h-[70vh]">
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
  );
}
