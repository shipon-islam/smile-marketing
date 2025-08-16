import InputBox from "@/components/InputBox";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useCreateDocument from "@/hooks/useCreateDocument";
import { clientRequestSchema } from "@/yup-schema/clientRequestSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function ClientRequestForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const inventory = location?.state?.inventory;
  const { createDocument, loading } = useCreateDocument();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientRequestSchema),
  });
  const onSubmit = async (value) => {
    const requestObj = {
      ...value,
      status: "new", //status="new"||"in_progress"||"completed"
      inventory: {
        id: inventory?.id,
        name: inventory?.name,
        category: inventory?.category,
        price: inventory?.price,
        brand: inventory?.brand,
        imageUrl: inventory?.imageUrl,
      },
    };

    const clientSnap = await createDocument(
      "client-requests",
      requestObj,
      "Request"
    );
    const notificationObj = {
      isView: false,
      pageType: "client",
      name: value?.name,
      email: value?.email,
      approveBtn: "view",
      rejectBtn: "cencel",
      clientId: clientSnap?.id,
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
    navigate("/");
  };
  return (
    <Layout>
      <div className=" mx-auto mt-8">
        <Card className="py-8">
          <CardHeader>
            <h1 className="text-2xl font-medium mt-4">Client Request form</h1>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="shadow rounded-lg p-4">
              <img
                className="w-[200px] h-auto md:w-[280px] md:h-[220px] rounded-md object-cover"
                src={inventory?.imageUrl}
                alt={"product-image"}
              />
              <div className="space-y-2 bg-[#F1F2F4] p-6 rounded-md mt-10 capitalize">
                <p className="">Product name : {inventory?.name}</p>
                <p>Price : ${inventory?.price}</p>
                <p>Category : {inventory?.category.replace("-", " ")}</p>
                <p>Band : {inventory?.brand}</p>
                <p>Stock: {inventory?.stock} available</p>
                <div className="flex gap-2 ">
                  <span>Selling Type :</span>
                  <span className="text-gray-500">
                    {inventory?.sellingType}
                  </span>
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
                  name="name"
                  label="Name *"
                  type="text"
                  {...register("name")}
                  error_message={errors?.name}
                />
                <InputBox
                  name="email"
                  label="Email *"
                  type="text"
                  {...register("email")}
                  error_message={errors?.email}
                />
                <div>
                  <label
                    className="font-medium mb-2 inline-block ml-1"
                    htmlFor={name}
                  >
                    Message *
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

                <Button
                  type="submit"
                  className="!py-2 text-base w-fit ml-auto px-8 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
