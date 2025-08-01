import { Icon } from "@iconify/react";
import { useState } from "react";

export default function InvisiblePassword({ password }) {
  const [isShow, setisShow] = useState(false);
  return (
    <div className="flex gap-2 w-fit text-gray-500">
      {isShow ? (
        <p>{password}</p>
      ) : (
        <div className="flex">
          <Icon icon="tabler:password" width="32" height="32" />
          <Icon icon="tabler:password" width="32" height="32" />
          <Icon icon="tabler:password" width="32" height="32" />
        </div>
      )}
      <button
        onClick={() => setisShow((prev) => !prev)}
        className="cursor-pointer hover:text-yellow-400 hoverEffect"
      >
        {isShow ? (
          <Icon icon="el:eye-close" width="24" height="24" />
        ) : (
          <Icon icon="mdi:eye" width="24" height="24" />
        )}
      </button>
    </div>
  );
}
