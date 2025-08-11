import { UseAuth } from "@/firebase/auth";
import useCreateDocument from "@/hooks/useCreateDocument";
import { providerSchema } from "@/yup-schema/providerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox";
import ProviderTable from "../../components/tables/ProviderTable";

export default function Providers() {
  const [isPending, setisPending] = useState(false);
  const { createDocument, loading } = useCreateDocument();
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(providerSchema),
  });
  const onSubmit = async (values) => {
    const tagsArray = values.tags.split(",");
    const tags = tagsArray.filter((tag) => tag !== "");
    const providerObj = {
      ...values,
      name: values.name.toLowerCase(),
      tags,
      creator: {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
      },
    };
    await createDocument("providers", providerObj, "Provider");
    navigate(0);
    reset();
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputBox
              label="Name *"
              type="text"
              {...register("name")}
              error_message={errors?.name}
            />
            <InputBox
              label="Company *"
              type="text"
              {...register("company")}
              error_message={errors?.company}
            />
            <InputBox
              label="Specialty *"
              type="text"
              {...register("specialty")}
              error_message={errors?.specialty}
            />
            <InputBox
              label="Email *"
              type="text"
              {...register("email")}
              error_message={errors?.email}
            />
            <InputBox
              label="Phone Number *"
              type="text"
              {...register("phone")}
              error_message={errors?.phone}
            />
            <InputBox
              label="Tags (write tag devide by comma) *"
              type="text"
              placeholder="Ex: asus,iphone"
              {...register("tags")}
              error_message={errors?.tags}
            />
          </div>
          <button className="bg-deepBlue py-2 px-5  text-gray-200 cursor-pointer uppercase rounded-lg font-medium mt-8 block ml-auto">
            {loading ? "Adding..." : "Add Provider"}
          </button>
        </form>
      </div>
      <div className={`mt-6 md:mt-20 ${isPending ? "hidden  md:block" : ""}`}>
        <ProviderTable />
      </div>
    </div>
  );
}
