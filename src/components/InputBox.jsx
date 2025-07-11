export default function InputBox({ label, name, ...rest }) {
  return (
    <div>
      <label className="font-medium mb-2 inline-block ml-1" htmlFor={name}>
        {label}
      </label>
      <input
        className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
}
