import { firestore_Db } from "@/firebase/config";
import { useGetRealTimeDocs } from "@/hooks/useGetRealTimeDocs";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import RequestBox from "./RequestBox";
import { ScrollArea } from "./ui/scroll-area";

export default function Notification({ notify }) {
  const { documents } = useGetRealTimeDocs("notifications");
  const handleNotify = async () => {
    if (notify.length > 0) {
      await Promise.all(
        notify.map((item) =>
          updateDoc(doc(firestore_Db, "notifications", item.id), {
            isView: true,
          })
        )
      );
    }
  };
  useEffect(() => {
    handleNotify();
  }, []);
  return (
    <div className={`bg-white px-3 sm:px-5 py-6 rounded-md w-full shadow`}>
      <h4 className="font-semibold capitalize text-xl mb-4">
        Recent Notifications
      </h4>
      <ScrollArea className="h-[70vh]">
        {documents?.map((notification) => {
          return (
            <RequestBox key={notification?.id} notification={notification} />
          );
        })}
      </ScrollArea>
    </div>
  );
}
