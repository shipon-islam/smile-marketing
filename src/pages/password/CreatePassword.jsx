import { Checkbox } from "@/components/ui/checkbox";
import { UseAuth } from "@/firebase/auth";
import useCreateDocument from "@/hooks/useCreateDocument";
import useImageUpload from "@/hooks/useImageUplaod";
import { passwordSchema } from "@/yup-schema/passwordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreatePassword() {
  const { uploadImage } = useImageUpload();
  const { createDocument } = useCreateDocument();
  const [loading, setLoading] = useState(false);
  const { currentUser } = UseAuth();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = async (data) => {
    const file = data.logo[0];
    setLoading(true);
    const imageUrl = await uploadImage(file, "logo");
    const passwordObj = {
      ...data,
      logo: imageUrl,
      access: ["admin"],
      creator: {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
      },
    };
    await createDocument("passwords", passwordObj, "Account password");
    reset();
    setLoading(false);
  };
  return (
    <div className={`bg-white p-4 md:p-8 rounded-lg  order-1 xl:order-2`}>
      <h1 className="text-3xl font-semibold mb-8">Create Account password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div>
          <label className="font-medium mb-2 inline-block ml-1" htmlFor="logo">
            Logo
          </label>
          <input
            className="border border-gray-200 py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
            id="logo"
            type="file"
            {...register("logo")}
          />
          {errors?.logo && (
            <p className="text-sm text-red-500 ml-1">{errors?.logo?.message}</p>
          )}
        </div>
        <div>
          <label
            className="font-medium mb-2 inline-block ml-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
            id="username"
            type="text"
            {...register("username")}
          />
          {errors?.username && (
            <p className="text-sm text-red-500 ml-1">
              {errors?.username?.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="font-medium mb-2 inline-block ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
            id="password"
            type="text"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-sm text-red-500 ml-1">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="flex gaps-2 mt-5">
          <Controller
            name="isSelf"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visible"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium  inline-block ml-1" htmlFor={name}>
                  self account? (optional)
                </span>
              </div>
            )}
          />
        </div>
        <button className="bg-deepBlue py-3 px-4 block w-fit ml-auto text-gray-200 cursor-pointer uppercase rounded-lg font-bold">
          {loading ? "Adding..." : "Add password"}
        </button>
      </form>
    </div>
  );
}
