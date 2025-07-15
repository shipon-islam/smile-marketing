import { Icon } from "@iconify/react";
import Logo from "../assets/logo/band-logo.png";
export default function Login() {
  return (
    <div className="grid place-items-center h-full w-full">
      <div className="h-96  w-96 bg-white mx-auto p-8 flex flex-col items-center justify-center rounded-lg shadow gap-y-4 ">
        <img src={Logo} alt="logo" />
        <button className="flex gap-2 py-2 px-4 border border-gray-500 items-center rounded-lg bg-white cursor-pointer">
          <Icon icon="flat-color-icons:google" width="30" height="30" />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
