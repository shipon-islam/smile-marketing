import MultiSelectTag from "@/components/MultiSelectTag";
import { Checkbox } from "@/components/ui/checkbox";
import useGetUserEmail from "@/hooks/useGetUserEmail";
import useImageDelete from "@/hooks/useImageDelete";
import useImageUpload from "@/hooks/useImageUplaod";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { passwordSchema } from "@/yup-schema/passwordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditPassword() {
  const location = useLocation();
  const passwordState = location?.state.password;
  const [selected, setSelected] = useState(passwordState?.access || []);
  const navigate = useNavigate();
  const { uploadImage } = useImageUpload();
  const { updateDocument } = useUpdateDocument();
  const [loading, setLoading] = useState(false);
  const { deleteImage } = useImageDelete();
  const { emails } = useGetUserEmail();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      username: passwordState?.username,
      password: passwordState?.password,
      isSelf: passwordState?.isSelf,
      websiteLink: passwordState?.websiteLink,
    },
  });

  const onSubmit = async (data) => {
    const files = data.logo;
    let passwordObj;
    setLoading(true);
    if (files && files.length > 0) {
      const imageUrl = await uploadImage(files[0], "logo");
      passwordObj = {
        logo: imageUrl,
        username: data.username,
        password: data.password,
        websiteLink: data.websiteLink,
        access: selected,
      };
    } else {
      passwordObj = {
        username: data.username,
        password: data.password,
        websiteLink: data.websiteLink,
        access: selected,
      };
    }
    await updateDocument(passwordState?.id, "passwords", passwordObj);
    if (files && files.length > 0) {
      await deleteImage(passwordState?.logo);
    }
    reset();
    setLoading(false);
    navigate("/dashboard/password");
  };
  return (
    <div className={`bg-white p-4 md:p-8 rounded-lg  order-1 xl:order-2`}>
      <h1 className="text-3xl font-semibold mb-8">Update Account password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-2 gap-8">
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              className="border border-gray-200 py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
              id="logo"
              type="file"
              {...register("logo")}
            />
            {errors?.logo && (
              <p className="text-sm text-red-500 ml-1">
                {errors?.logo?.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="username"
            >
              Website Link *
            </label>
            <input
              className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
              id="websiteLink"
              type="text"
              {...register("websiteLink")}
            />
            {errors?.websiteLink && (
              <p className="text-sm text-red-500 ml-1">
                {errors?.websiteLink?.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="username"
            >
              Username *
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
              Password *
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
          <div>
            <MultiSelectTag
              className="!max-w-full"
              label="Access (who can see)"
              setSelected={setSelected}
              selected={selected}
              options={emails ? emails : []}
            />
          </div>

          <div className="gaps-2 mt-5 hidden">
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
                  <span
                    className="font-medium  inline-block ml-1"
                    htmlFor={name}
                  >
                    self account? (optional)
                  </span>
                </div>
              )}
            />
          </div>
        </div>
        <button className="bg-deepBlue py-3 px-4 block w-fit ml-auto text-gray-200 cursor-pointer uppercase rounded-lg font-bold">
          {loading ? "Updating..." : "update password"}
        </button>
      </form>
    </div>
  );
}
