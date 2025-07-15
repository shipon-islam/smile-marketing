import { Icon } from "@iconify/react";
import { useState } from "react";
import Band_Logo from "../assets/logo/band-logo.png";
import HeaderAvatar from "./HeaderAvatar";
import Layout from "./Layout";
import NotificationBar from "./ui/NotificationBar";
export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  return (
    <header className="py-4 bg-white sticky top-0 z-50 shadow-xs">
      <Layout>
        <nav className="flex items-center justify-between">
          <div>
            <img
              src={Band_Logo}
              alt="Smile Marketing Logo"
              className="h-auto w-34 lg:w-auto max-w-full"
            />
          </div>
          <div className="flex items-center justify-between gap-x-5 lg:gap-x-8">
            <div className="hidden md:flex  py-2 px-3 border border-gray-300 rounded-lg w-full md:min-w-[350px] lg:min-w-[600px]">
              <input
                className="border-none outline-none w-full h-full block"
                type="text"
                placeholder="I'm Looking For..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button>
                <Icon
                  icon="iconamoon:search-bold"
                  width="24"
                  height="24"
                  className="text-gray-300"
                />
              </button>
            </div>
            <button
              onClick={() => setSearchToggle((prev) => !prev)}
              className="md:hidden"
            >
              {searchToggle ? (
                <Icon
                  icon="material-symbols:close"
                  width="30"
                  height="30"
                  className="text-gray-300"
                />
              ) : (
                <Icon
                  icon="iconamoon:search-bold"
                  width="30"
                  height="30"
                  className="text-gray-300"
                />
              )}
            </button>
            <div className="flex items-center gap-x-5 lg:gap-x-8 w-full">
              <NotificationBar />
              <HeaderAvatar />
            </div>
          </div>
        </nav>
        {searchToggle && (
          <div className="flex md:hidden mt-6  py-2 px-3 border border-gray-300 rounded-lg w-full md:min-w-[350px] lg:min-w-[600px]">
            <input
              className="border-none outline-none w-full h-full block"
              type="text"
              placeholder="I'm Looking For..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button>
              <Icon
                icon="iconamoon:search-bold"
                width="24"
                height="24"
                className="text-gray-300"
              />
            </button>
          </div>
        )}
      </Layout>
    </header>
  );
}
