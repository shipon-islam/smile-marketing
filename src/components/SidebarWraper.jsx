import Layout from "./Layout";
import Sidebar from "./Sidebar";

export default function SidebarWraper({ children }) {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="lg:flex">
          <div className="lg:w-64 2xl:w-72 text-white">
            <Sidebar />
          </div>
          <div className="lg:flex-1 sm:p-4 mt-4 lg:mt-0">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
