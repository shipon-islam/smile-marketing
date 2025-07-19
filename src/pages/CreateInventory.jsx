import FileDropZone from "@/components/FileDropZone";
import InputBox from "@/components/InputBox";
import MultiSelectTag from "@/components/MultiSelectTag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { inventorySchema } from "@/yup-schema/inventory";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
const options = ["React", "Vue", "Angular", "Svelte", "Next.js"];
const steps = ["Product Info", "Product Info and Image", "Preview and Confirm"];
export default function CreateInventory() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inventorySchema),
  });
  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);
  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Card className="px-4 sm:px-8">
        <h1 className="capitalize text-2xl font-medium mt-4 ">
          create new inventory
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
                  label="Product name :"
                  error_message={errors.name}
                />
                <InputBox
                  {...register("brand")}
                  label="Brand :"
                  type="select"
                  items={["Asus", "Apple"]}
                  placeholder="Select Brand"
                  error_message={errors.brand}
                />
                <InputBox
                  label="Category :"
                  type="select"
                  items={["technology", "furniture"]}
                  placeholder="Select Category"
                  {...register("category")}
                  error_message={errors.category}
                />
                <InputBox
                  label="Product Price :"
                  {...register("price")}
                  type="number"
                  error_message={errors.price}
                />
                <InputBox
                  label="Location :"
                  type="select"
                  items={["Asus", "Apple"]}
                  placeholder="Select Location"
                  {...register("location")}
                  error_message={errors.location}
                />

                <InputBox
                  label="Stock Available :"
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
                      label="Selling Type :"
                      type="select"
                      items={["Rent", "Purchase"]}
                      placeholder="Selling Type"
                      {...register("sellingType")}
                      error_message={errors.sellingType}
                    />
                    <InputBox
                      label="Contact Links :"
                      {...register("contactLink")}
                      error_message={errors.contactLink}
                    />

                    <InputBox
                      label="Status :"
                      type="select"
                      items={["Checked In", "Checked Out"]}
                      placeholder="Select Status"
                      {...register("status")}
                      error_message={errors.status}
                    />
                    <div>
                      <MultiSelectTag
                        label="Tags"
                        setSelected={setSelected}
                        selected={selected}
                        options={options}
                      />
                      <p className="text-red-500 text-sm ml-1">
                        {selected.length < 1 ? "tags are required" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 -mt-20">
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

                <div className="px-4 space-y-4">
                  <div>
                    <label
                      className="font-medium mb-2 inline-block ml-1"
                      htmlFor={name}
                    >
                      Product Image :
                    </label>
                    <FileDropZone />
                  </div>

                  <img
                    src="placeholder_image.png"
                    className="w-full full h-[155px]  rounded-lg object-cover"
                  />
                </div>
              </div>
            )}
            {step == 3 && <div>Preview all the field</div>}

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
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
