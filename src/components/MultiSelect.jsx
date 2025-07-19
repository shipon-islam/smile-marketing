import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
export default function MultiSelect({
  items,
  onSelect,
  placeholder,
  defaultValue,
}) {
  const [isList, setIsList] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      onSelect(defaultValue);
    }
  }, [defaultValue, onSelect]);

  //for window modal close
  function handleWindowClick(event) {
    if (event.target.closest(".select-container") === null) {
      setIsList(false);
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div className="relative select-container">
      <button
        onClick={() => setIsList((prev) => !prev)}
        className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-1.5 cursor-pointer text-gray-500"
      >
        <Icon icon="ion:filter" width="20" height="20" />
        <span>
          Sort by:{" "}
          <strong className="font-normal capitalize text-gray-600">
            {selectedValue ? selectedValue : placeholder}
          </strong>
        </span>
      </button>
      {isList && (
        <ul className=" border border-gray-300 rounded-md p-2 absolute bg-white w-full top-11">
          {items?.map((item, index) => (
            <li
              onClick={() => {
                setIsList(false);
                setSelectedValue(item);
                onSelect(item);
              }}
              key={index}
              className="capitalize cursor-pointer hover:bg-light px-2 py-1 rounded-md"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
