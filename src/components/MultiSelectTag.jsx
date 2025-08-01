import React, { useRef, useState } from "react";

const MultiSelectTag = ({
  options,
  label,
  selected,
  setSelected,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      setSelected([...selected, option]);
    }
  };

  const removeTag = (tag) => {
    setSelected(selected.filter((item) => item !== tag));
  };

  // Close dropdown if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`} ref={boxRef}>
      <label className="font-medium mb-2 inline-block ml-1" htmlFor={name}>
        {label}
      </label>

      <div
        className="relative  rounded-lg px-2 py-2 cursor-pointer min-h-[48px]  flex flex-wrap gap-2 items-center bg-[#F1F2F4]"
        onClick={toggleDropdown}
      >
        {selected.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 text-blue-600 hover:text-red-600"
            >
              &times;
            </button>
          </div>
        ))}
        <div className="ml-auto text-gray-500 text-sm">&#9662;</div>

        {isOpen && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow z-10 max-h-48 overflow-y-auto">
            {options
              .filter((opt) => !selected.includes(opt))
              .map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            {options.filter((opt) => !selected.includes(opt)).length === 0 && (
              <div className="px-3 py-2 text-gray-400 text-sm">
                No more options
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectTag;
