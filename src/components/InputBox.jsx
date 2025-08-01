export default function InputBox({
  className,
  label,
  placeholder,
  items,
  type = "text",
  initalValue,
  error_message,
  ...rest
}) {
  if (type == "select") {
    return (
      <div>
        <label className="font-medium mb-2 inline-block ml-1" htmlFor={name}>
          {label}
        </label>
        <select
          className={`outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg capitalize ${className}`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {items?.map((item, index) => (
            <option
              className="capitalize"
              key={index}
              value={item.slug}
              selected={item.slug == initalValue ? true : false}
            >
              {item.name}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm ml-1">{error_message?.message}</p>
      </div>
    );
  }
  return (
    <div>
      <label className="font-medium mb-2 inline-block ml-1" htmlFor={name}>
        {label}
      </label>
      <input
        className={`outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg ${className}`}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error_message?.message && (
        <p className="text-red-500 text-sm ml-1">{error_message.message}</p>
      )}
    </div>
  );
}
