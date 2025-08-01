import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UseAuth } from "@/firebase/auth";

export default function Profile() {
  const { currentUser } = UseAuth();
  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="font-medium text-xl">Profile Details</h1>
        </CardHeader>
        <CardContent>
          <Card className="w-fit">
            <CardContent>
              <img
                src={currentUser?.avatar}
                alt="user"
                className="w-24 h-auto border rounded-md"
              />
              <div className="mt-8 space-y-3 capitalize">
                <h5>
                  <strong className="block sm:inline">Name: </strong>
                  {currentUser?.name}
                </h5>
                <h5>
                  <strong className="block sm:inline">Email: </strong>
                  {currentUser?.email}
                </h5>
                <h5>
                  <strong className="block sm:inline">Role: </strong>
                  {currentUser?.role}
                </h5>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
