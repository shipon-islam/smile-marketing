import { DatePickerInput } from "@/components/DatePickerInput";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UseAuth } from "@/firebase/auth";
import useCreateDocument from "@/hooks/useCreateDocument";
import { clientRequestSchema } from "@/yup-schema/clientRequestSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutRequestForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const inventory = location?.state?.inventory;
  const [neededFrom, setNeededFrom] = useState(null);
  const [neededTo, setNeededTo] = useState(null);
  const { currentUser } = UseAuth();
  const [errorDate, setErrorDate] = useState("");
  const { createDocument, loading } = useCreateDocument();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientRequestSchema),
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      message: "",
    },
  });
  const onSubmit = async (value) => {
    if (!neededFrom || !neededTo) {
      setErrorDate("Start and End date required");
      return;
    }

    const requestObj = {
      decisionBy: null,
      decisionDate: null,
      neededFrom,
      neededTo,
      message: value.message,
      status: "pending", //status="pending"||"approved"||"rejected"
      requestBy: {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        avatar: currentUser?.avatar,
      },
      inventory: {
        id: inventory?.id,
        name: inventory?.name,
        category: inventory?.category,
        price: inventory?.price,
        brand: inventory?.brand,
        imageUrl: inventory?.imageUrl,
      },
    };
    const checkoutSnap = await createDocument(
      "checkout-requests",
      requestObj,
      "Checkout request"
    );
    const notificationObj = {
      isView: false,
      pageType: "checkout",
      name: currentUser?.name,
      email: currentUser?.email,
      neededFrom: neededFrom,
      neededTo: neededTo,
      approveBtn: "approve",
      rejectBtn: "reject",
      checkoutId: checkoutSnap?.id,
      inventory: {
        id: inventory?.id,
        name: inventory?.name,
        category: inventory?.category,
        brand: inventory?.brand,
        location: inventory?.location,
      },
    };
    await createDocument("notifications", notificationObj);
    reset();
    navigate("/dashboard/checkout-requests");
  };
  return (
    <div className=" mx-auto mt-8">
      <Card className="!p-2 md:p-8">
        <CardHeader>
          <h1 className="text-2xl font-medium mt-4">Checkout Request form</h1>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 my-8">
          <div className="shadow rounded-lg p-4">
            <img
              className="w-[200px] h-auto md:w-[280px] md:h-[220px] "
              src={"/images/products/laptop.png"}
              alt={"product-image"}
            />
            <div className="space-y-2 bg-[#F1F2F4] p-6 rounded-md mt-10">
              <p className="">Product name : MacBook M1 Pro</p>
              <p>Price : $1500</p>
              <p>Category : Technology</p>
              <p>Band :Apple</p>
              <p>Stock: 4 available</p>
              <div className="flex gap-2 ">
                <span>Selling Type :</span>
                <span className="text-gray-500">Rent</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-xl font-medium mb-1">
                Your some Information
              </h1>
              <p>Please fill all the field</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 mt-8"
            >
              <InputBox
                disabled
                name="name "
                label="Name *"
                type="text"
                {...register("name")}
                error_message={errors?.name}
              />
              <InputBox
                disabled
                name="email"
                label="Email *"
                type="text"
                {...register("email")}
                error_message={errors?.email}
              />
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <label className="mb-2 inline-block ml-1">
                      Needed from *
                    </label>
                    <DatePickerInput
                      setDate={setNeededFrom}
                      date={neededFrom}
                    />
                    <p></p>
                  </div>
                  <div>
                    <label className=" mb-2 inline-block ml-1">
                      Needed To *
                    </label>
                    <DatePickerInput setDate={setNeededTo} date={neededTo} />
                  </div>
                </div>
                <p className="text-red-500 text-sm ml-1 mt-1">{errorDate}</p>
              </div>
              <div>
                <label
                  className="font-medium mb-2 inline-block ml-1"
                  htmlFor={name}
                >
                  Message (why need?) *
                </label>
                <textarea
                  className={`outline-none pt-2 pb-3 px-2 w-full bg-[#F1F2F4] rounded-lg min-h-[100px]`}
                  id="message"
                  {...register("message")}
                ></textarea>
                {errors?.message && (
                  <p className="text-sm text-red-500 ml-1">
                    {errors?.message?.message}
                  </p>
                )}
              </div>

              <Button className="!py-2 h-full text-base w-fit ml-auto px-8 cursor-pointer inline-block">
                {loading ? "Requesting..." : "Checkout Request"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
