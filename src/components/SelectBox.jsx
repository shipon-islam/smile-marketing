export default function SelectBox({
  items,
  label,
  onSelect,
  className,
  placeholder,
  labelClassName,
  ...rest
}) {
  return (
    <div className="mb-4 sm:mb-2">
      <label
        className={`sm:text-sm pl-0.5 ${labelClassName}`}
        htmlFor={label.toLowerCase()}
      >
        {label} :
      </label>
      <select
        className={`mt-0.5 w-full border border-gray-300 outline-none p-1 rounded-md sm:text-sm ${className}`}
        placeholder="select"
        onChange={(e) => onSelect(e.target.value)}
        id="category"
        {...rest}
      >
        <option value="">{placeholder}</option>
        {items?.map((item, index) => (
          <option className="capitalize" key={index} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
