import Layout from "./Layout";
import Sidebar from "./Sidebar";

export default function SidebarWraper({ children }) {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="md:flex">
          <div className="md:w-64 2xl:w-72 text-white">
            <Sidebar />
          </div>
          <div className="md:flex-1 p-2 sm:p-4">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
