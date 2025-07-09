export default function Layout({ children, className }) {
  return (
    <div className={` ${className}`}>
      <div className="max-w-[1536px] mx-auto px-4 md:px-10 lg:px-8">
        {children}
      </div>
    </div>
  );
}
