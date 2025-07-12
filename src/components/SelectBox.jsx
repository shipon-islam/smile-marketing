export default function SelectBox({ items, label, onSelect, ...rest }) {
  return (
    <div className="mb-4 sm:mb-2">
      <label className="sm:text-sm pl-0.5" htmlFor={label.toLowerCase()}>
        {label} :
      </label>
      <select
        className="mt-0.5 w-full border border-gray-300 outline-none p-1 rounded-md sm:text-sm"
        placeholder="select"
        name={label.toLowerCase()}
        onChange={(e) => onSelect(e.target.value)}
        id="category"
        {...rest}
      >
        <option value="select">Select</option>
        {items?.map((item, index) => (
          <option className="capitalize" key={index} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
