export default function Card({ children, className }) {
  return (
    <div
      className={`bg-white px-3 sm:px-5 py-6 rounded-md shadow ${className}`}
    >
      {children}
    </div>
  );
}
