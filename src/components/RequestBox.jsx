import { UseAuth } from "@/firebase/auth";
import { firestore_Db } from "@/firebase/config";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { GetTime } from "@/utils/GetTime";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function RequestBox({ notification }) {
  const { updateDocument } = useUpdateDocument();
  const { deleteDocument } = useDeleteDocument();
  const { currentUser } = UseAuth();
  const handleApproveClick = async (notify) => {
    const { checkoutId, inventory } = notify;
    await updateDocument(
      checkoutId,
      "checkout-requests",
      {
        status: "approved",
        decisionDate: Timestamp.now(),
        decisionBy: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
      },
      false
    );
    const getInventory = await getDoc(
      doc(firestore_Db, "inventories", inventory?.id)
    );
    const stock = Number(getInventory.data().stock);
    await updateDocument(
      inventory?.id,
      "inventories",
      {
        status: "checked out",
        checkedOutBy: {
          name: notify?.name,
          email: notify?.email,
        },
        stock: stock > 0 ? stock - 1 : stock,
      },
      false
    );
    await updateDocument(notify.id, "notifications", {
      approveBtn: "approved",
    });
  };
  const handleRejectClick = async (notify) => {
    const { checkoutId, inventory } = notify;
    await updateDocument(
      checkoutId,
      "checkout-requests",
      {
        status: "rejected",
        decisionDate: Timestamp.now(),
        decisionBy: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
      },
      false
    );
    await updateDocument(
      inventory?.id,
      "inventories",
      {
        status: "checked in",
        checkedOutBy: null,
      },
      false
    );
    await updateDocument(notify.id, "notifications", {
      rejectBtn: "rejected",
    });
  };
  const handleCencelClick = async (notify) => {
    const { clientId } = notify;
    await deleteDocument(clientId, "client-requests");

    await updateDocument(
      notify.id,
      "notifications",
      {
        rejectBtn: "cenceled",
      },
      false
    );
  };
  if (notification?.pageType === "client") {
    return (
      <div className="border border-gray-100 rounded-md p-3 mb-2">
        <h5 className="font-medium capitalize text-lg md:text-base">
          {notification?.inventory?.name}
        </h5>
        <p className="text-sm md:text-xs capitalize my-0.5">{`requested by ${
          notification?.name
        } ${GetTime(notification?.createdAt)}`}</p>
        <p className="capitalize text-sm md:text-xs">
          location: {notification?.inventory?.location}
        </p>
        <div className="flex justify-between gap-x-4 mt-3">
          <button
            disabled={notification?.rejectBtn !== "cencel" ? true : false}
            className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-[#DFF9EE] text-green-700 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md  cursor-pointer text-center "
          >
            <Link to="/dashboard/client-requests" className="">
              {notification?.approveBtn}
            </Link>
          </button>
          <button
            disabled={notification?.rejectBtn !== "cencel" ? true : false}
            onClick={() => handleCencelClick(notification)}
            className="bg-[#FEEFF0] text-red-600 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md flex-1 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {notification?.rejectBtn}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-gray-100 rounded-md p-3 mb-2">
      <h5 className="font-medium capitalize text-lg md:text-base">
        {notification?.inventory?.name}
      </h5>
      <p className="text-sm md:text-xs capitalize my-0.5">{`requested by ${
        notification?.name
      }. needed ${GetTime(notification?.neededFrom)} to ${GetTime(
        notification?.neededTo
      )}`}</p>
      <p className="capitalize text-sm md:text-xs">
        location: {notification?.inventory?.location}
      </p>
      <div className="flex justify-between gap-x-4 mt-3">
        <button
          disabled={
            notification?.approveBtn !== "approve" ||
            notification?.rejectBtn !== "reject"
              ? true
              : false
          }
          onClick={() => handleApproveClick(notification)}
          className="bg-[#DFF9EE] text-green-700 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md flex-1 cursor-pointer  disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {notification?.approveBtn}
        </button>
        <button
          onClick={() => handleRejectClick(notification)}
          disabled={
            notification?.approveBtn !== "approve" ||
            notification?.rejectBtn !== "reject"
              ? true
              : false
          }
          className="bg-[#FEEFF0] text-red-600 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md flex-1 cursor-pointer  disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {notification?.rejectBtn}
        </button>
      </div>
    </div>
  );
}
