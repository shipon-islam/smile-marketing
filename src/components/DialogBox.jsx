import { useEffect, useState } from "react";
export default function DialogBox({ children, intialButton, className }) {
  const [isShow, setIsShow] = useState(false);

  //for window modal close
  function handleWindowClick(event) {
    if (event.target.closest(".dialog-container") === null) {
      setIsShow(false);
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div className="relative dialog-container">
      <div onClick={() => setIsShow((prev) => !prev)}>{intialButton}</div>
      {isShow && (
        <div
          className={`absolute bg-white px-6 pt-5 pb-4 min-w-40 border border-gray-300 rounded-lg -right-5 sm:right-0 top-11 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
