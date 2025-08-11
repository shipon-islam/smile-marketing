import InputBox from "@/components/InputBox";
import { Card } from "@/components/ui/card";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { providerSchema } from "@/yup-schema/providerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProvider() {
  const location = useLocation();
  const { updateDocument, loading } = useUpdateDocument();
  const navigate = useNavigate();
  const provider = location.state?.provider;
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(providerSchema),
    defaultValues: {
      name: provider?.name,
      company: provider?.company,
      specialty: provider?.specialty,
      email: provider?.email,
      phone: provider?.phone,
      tags: provider?.tags.join(","),
    },
  });
  const onSubmit = async (values) => {
    const tagsArray = values.tags.split(",");
    const tags = tagsArray.filter((tag) => tag !== "");
    const providerObj = { ...values, tags };
    await updateDocument(provider.id, "providers", providerObj);
    reset();
    navigate("/dashboard/providers");
  };
  return (
    <div className={`mt-6 md:mt-0 `}>
      <Card className="px-8 py-10 min-h-[60vh]">
        <h4 className="font-medium text-2xl capitalize mb-10">
          Update Provider
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
            {loading ? "Updating..." : "Update Provider"}
          </button>
        </form>
      </Card>
    </div>
  );
}
