import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ClientRequestForm() {
  return (
    <div className=" mx-auto mt-8">
      <Card className="!p-2 md:p-8">
        <CardHeader>
          <h1 className="text-2xl font-medium mt-4">Client Request form</h1>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="shadow rounded-lg p-4">
            <img
              className="w-[200px] h-auto md:w-[280px] md:h-[220px] "
              src={"/images/products/laptop.png"}
              alt={"product-image"}
            />
            <div className="space-y-2 bg-[#F1F2F4] !p-2 md:p-4 rounded-md">
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

            <form action="#" className="grid grid-cols-1 gap-4 mt-8">
              <InputBox name="name" label="Name :" type="text" />
              <InputBox name="email" label="Email :" type="text" />
              <div>
                <label
                  className="font-medium mb-2 inline-block ml-1"
                  htmlFor={name}
                >
                  Message :
                </label>
                <textarea
                  className={`outline-none pt-2 pb-3 px-2 w-full bg-[#F1F2F4] rounded-lg min-h-[100px]`}
                  id="message"
                  name="message"
                ></textarea>
              </div>

              <Button className="!py-2 text-base w-fit ml-auto px-8">
                Send
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
