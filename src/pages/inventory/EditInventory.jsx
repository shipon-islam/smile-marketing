import FileDropZone from "@/components/FileDropZone";
import InputBox from "@/components/InputBox";
import MultiSelectTag from "@/components/MultiSelectTag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useGetCatBrandLoc from "@/hooks/useGetCatBrandLoc";
import useImageDelete from "@/hooks/useImageDelete";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { inventorySchema } from "@/yup-schema/inventory";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const steps = ["Product Info", "Product Info and Image", "Preview and Confirm"];

export default function EditInventory() {
  const location = useLocation();
  const inventory = location.state?.inventory;
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(inventory.tags || []);
  const [imageUrl, setImageUrl] = useState(inventory.imageUrl || "");
  const { categories, brands, locations, tags } = useGetCatBrandLoc();
  const { deleteImage, deleting } = useImageDelete();
  const navigate = useNavigate();
  const { updateDocument } = useUpdateDocument();

  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inventorySchema),
    defaultValues: {
      name: inventory?.name,
      brand: inventory?.brand,
      category: inventory?.category,
      price: inventory?.price,
      location: inventory?.location,
      stock: inventory?.stock,
      sellingType: inventory?.sellingType,
      contactLink: inventory?.contactLink,
      isVisibleToClients: inventory?.isVisibleToClients,
    },
  });

  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);
  const onSubmit = async (data) => {
    if (!imageUrl || selected.length < 1) {
      toast.error("You have more mising field, check image or tags");
      return;
    }
    const inventoryObj = {
      ...data,
      tags: selected,
      imageUrl: imageUrl,
    };

    try {
      await updateDocument(inventory.id, "inventories", inventoryObj);
      if (inventory.imageUrl !== imageUrl) {
        await deleteImage(inventory.imageUrl);
      }
      setStep(1);
      navigate("/dashboard/inventory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="px-4 sm:px-8">
        <h1 className="capitalize text-2xl font-medium mt-4 ">
          Edit Existing inventory
        </h1>
        <div className="w-full mx-auto mt-4">
          {/* Stepper Start*/}
          <div className="relative flex justify-between items-center mb-8">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              const isCompleted = step > stepNumber;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center z-10"
                >
                  <div
                    style={{
                      backgroundColor:
                        Object.keys(errors).length > 0 ? "red" : "",
                    }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition
                  ${
                    isCompleted || isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                `}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`mt-1 text-xs text-center ${
                      isActive ? "text-blue-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0">
              <div
                className={`h-1 bg-blue-500 transition-all duration-300`}
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          {/* Stepper end */}
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            {step == 1 && (
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  {...register("name")}
                  label="Product name *"
                  error_message={errors.name}
                />
                <InputBox
                  {...register("brand")}
                  label="Brand *"
                  type="select"
                  items={brands}
                  placeholder="Select Brand"
                  error_message={errors.brand}
                  initalValue={inventory?.brand}
                />
                <InputBox
                  label="Category *"
                  type="select"
                  items={categories}
                  placeholder="Select Category"
                  {...register("category")}
                  error_message={errors.category}
                  initalValue={inventory?.category}
                />
                <InputBox
                  label="Product Price *"
                  {...register("price")}
                  type="number"
                  error_message={errors.price}
                />
                <InputBox
                  label="Location *"
                  type="select"
                  items={locations}
                  placeholder="Select Location"
                  {...register("location")}
                  error_message={errors.location}
                  initalValue={inventory?.location}
                />

                <InputBox
                  label="Stock Available *"
                  type="number"
                  {...register("stock")}
                  error_message={errors?.stock}
                />
              </div>
            )}

            {step == 2 && (
              <div className="grid sm:grid-cols-[1fr_18rem] xl:grid-cols-[1fr_20rem] gap-3 items-start">
                <div>
                  <div className="grid xl:grid-cols-2 auto-rows-[200px] gap-8 grid-rows-3">
                    <InputBox
                      label="Selling Type *"
                      type="select"
                      items={[
                        { name: "Rent", slug: "rent" },
                        { name: "Purchase", slug: "purchase" },
                      ]}
                      placeholder="Selling Type"
                      {...register("sellingType")}
                      error_message={errors.sellingType}
                      initalValue={inventory?.sellingType}
                    />
                    <InputBox
                      label="Contact Links *"
                      {...register("contactLink")}
                      error_message={errors.contactLink}
                    />

                    <div>
                      <MultiSelectTag
                        label="Tags *"
                        setSelected={setSelected}
                        selected={selected}
                        options={tags?.map((tag) => tag.name)}
                      />
                      <p className="text-red-500 text-sm ml-1">
                        {selected.length < 1 ? "tags are required" : ""}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center mt-8">
                      <Controller
                        name="isVisibleToClients"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="visible"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-5 h-5"
                            />
                            <span
                              className="font-medium  inline-block ml-1"
                              htmlFor={name}
                            >
                              Are you want to Visible in Client page?
                            </span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 space-y-4">
                  <div>
                    <label
                      className="font-medium mb-2 inline-block ml-1"
                      htmlFor={name}
                    >
                      Product Image *{" "}
                    </label>
                    <FileDropZone setImageUrl={setImageUrl} />
                  </div>
                  {!imageUrl && (
                    <p className="text-sm text-red-500 ml-1">
                      Image is required !
                    </p>
                  )}
                  <div className="relative">
                    <img
                      src={imageUrl || "placeholder_image.png"}
                      className="w-full full h-[155px]  rounded-lg object-cover border border-gray-200"
                    />
                    {imageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          deleteImage(imageUrl);
                          setImageUrl("");
                        }}
                      >
                        <Icon
                          className="absolute top-2 right-2 text-red-500 cursor-pointer size-5"
                          icon="material-symbols:delete"
                        />
                      </button>
                    )}
                    {deleting && (
                      <button>
                        <Icon
                          className="absolute top-2 right-2 text-red-500 cursor-pointer size-5"
                          icon="eos-icons:loading"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {step == 3 && (
              <div>
                <h1 className="text-2xl mb-8 py-2 border-b">Preview Details</h1>
                <div className="grid sm:grid-cols-2 gap-8">
                  <ul className="capitalize space-y-3">
                    <li>
                      <strong>product name: </strong> {getValues("name")}
                    </li>
                    <li>
                      <strong>product brand: </strong> {getValues("brand")}
                    </li>
                    <li>
                      <strong>product category: </strong>{" "}
                      {getValues("category")}
                    </li>
                    <li>
                      <strong>product price: </strong> {getValues("price")}
                    </li>
                    <li>
                      <strong>product loation: </strong> {getValues("location")}
                    </li>
                    <li>
                      <strong>stock available: </strong> {getValues("stock")}
                    </li>
                  </ul>
                  <ul className="capitalize space-y-3">
                    <li>
                      <strong>selling type: </strong> {getValues("sellingType")}
                    </li>
                    <li>
                      <strong>contact link: </strong> {getValues("brand")}
                    </li>
                    <li>
                      <strong>tags : </strong>{" "}
                      {selected.map((item) => item + " ,")}
                    </li>
                    <li>
                      <strong>visible client: </strong>{" "}
                      {getValues("isVisibleToClients") ? "Yes" : "No"}
                    </li>
                    <li>
                      <img
                        src={imageUrl || "placeholder_image.png"}
                        className="w-[200px] full h-[100px]  rounded-lg object-cover border border-gray-200"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 items-center">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 h-fit bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Previous
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Next
                </button>
              ) : (
                <Button className="cursor-pointer !px-4 !py-3 text-base">
                  Update
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
