import { firestore_Db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import InputBox from "./InputBox";
import ItemDropdown from "./ItemDropdown";
import { Button } from "./ui/button";

export default function InventoryAdditional() {
  const [dropDown, setdropDown] = useState({
    isCategory: false,
    isBrand: false,
    isLocation: false,
    isTag: false,
  });
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  // Handle category creation
  const handleCategory = async (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Category is required");
      return;
    }
    setLoading(true);
    try {
      const snapshot = await addDoc(collection(firestore_Db, "categories"), {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
        createdAt: serverTimestamp(),
      });
      console.log("Category added with ID: ", snapshot.id);
      toast.success("Category created successfully");
      setCategory("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
      setLoading(false);
    }
  };
  // handle brand creation
  const handleBrand = async (e) => {
    e.preventDefault();

    if (!brand) {
      toast.error("Brand is required");
      return;
    }
    setLoading(true);
    try {
      const snapshot = await addDoc(collection(firestore_Db, "brands"), {
        name: brand,
        slug: brand.toLowerCase().replace(/\s+/g, "-"),
        createdAt: serverTimestamp(),
      });
      console.log("Brand added with ID: ", snapshot.id);
      toast.success("Brand created successfully");
      setBrand("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create brand");
      setLoading(false);
    }
  };
  // handle location creation
  const handleLocation = async (e) => {
    e.preventDefault();

    if (!location) {
      toast.error("Location is required");
      return;
    }
    setLoading(true);
    try {
      const snapshot = await addDoc(collection(firestore_Db, "locations"), {
        name: location,
        slug: location.toLowerCase().replace(/\s+/g, "-"),
        createdAt: serverTimestamp(),
      });
      console.log("Location added with ID: ", snapshot.id);
      toast.success("Location created successfully");
      setLocation("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create location");
      setLoading(false);
    }
  };
  // handle tags creation
  const handleTag = async (e) => {
    e.preventDefault();

    if (!tag) {
      toast.error("Tag is required");
      return;
    }
    setLoading(true);
    try {
      const snapshot = await addDoc(collection(firestore_Db, "tags"), {
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, "-"),
        createdAt: serverTimestamp(),
      });

      console.log("Tag added with ID: ", snapshot.id);
      toast.success("Tag created successfully");
      setTag("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create tag");
      setLoading(false);
    }
  };
  return (
    <div className="mb-4 p-4 shadow bg-white rounded-lg">
      <div className="text-white grid text-sm md:text-base  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        <button
          onClick={() =>
            setdropDown({
              isBrand: false,
              isLocation: false,
              isCategory: !dropDown.isCategory,
              isTag: false,
            })
          }
          className={`bg-deepBlue md:px-8 py-2 capitalize rounded-md cursor-pointer hoverEffect hover:bg-deepBlue/80 ${
            dropDown.isCategory ? "bg-deepBlue/80" : ""
          }`}
        >
          create category
        </button>
        <button
          onClick={() =>
            setdropDown({
              isBrand: !dropDown.isBrand,
              isLocation: false,
              isCategory: false,
              isTag: false,
            })
          }
          className={`bg-deepBlue md:px-8 py-2 capitalize rounded-md cursor-pointer hoverEffect hover:bg-deepBlue/80 ${
            dropDown.isBrand ? "bg-deepBlue/80" : ""
          }`}
        >
          create brand
        </button>
        <button
          onClick={() =>
            setdropDown({
              isBrand: false,
              isLocation: !dropDown.isLocation,
              isCategory: false,
              isTag: false,
            })
          }
          className={`bg-deepBlue md:px-8 py-2 capitalize rounded-md cursor-pointer hoverEffect hover:bg-deepBlue/80 ${
            dropDown.isLocation ? "bg-deepBlue/80" : ""
          }`}
        >
          create location
        </button>
        <button
          onClick={() =>
            setdropDown({
              isBrand: false,
              isTag: !dropDown.isTag,
              isLocation: false,
              isCategory: false,
            })
          }
          className={`bg-deepBlue md:px-8 py-2 capitalize rounded-md cursor-pointer hoverEffect hover:bg-deepBlue/80 ${
            dropDown.isTag ? "bg-deepBlue/80" : ""
          }`}
        >
          create tag
        </button>
      </div>
      {dropDown.isCategory && (
        <div className="grid sm:grid-cols-2 gap-8 shadow p-4">
          <form
            onSubmit={handleCategory}
            className="w-full block mt-4 space-y-2 "
          >
            <InputBox
              label="Category :"
              value={category}
              className="w-full block"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button className="ml-auto block px-8 bg-blue-400 cursor-pointer hover:bg-blue-500 ">
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          <ItemDropdown name="See All Categories" collectionName="categories" />
        </div>
      )}
      {dropDown.isBrand && (
        <div className="grid sm:grid-cols-2 gap-8 shadow p-4">
          <form onSubmit={handleBrand} className="w-full block mt-4 space-y-2 ">
            <InputBox
              label="Brand :"
              value={brand}
              className="w-full block"
              onChange={(e) => setBrand(e.target.value)}
            />
            <Button className="ml-auto block px-8 bg-blue-400 cursor-pointer hover:bg-blue-500 ">
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          <ItemDropdown name="See All Brand" collectionName="brands" />
        </div>
      )}
      {dropDown.isLocation && (
        <div className="grid sm:grid-cols-2 gap-8 shadow p-4">
          <form
            onSubmit={handleLocation}
            className="w-full block mt-4 space-y-2 "
          >
            <InputBox
              label="Location :"
              value={location}
              className="w-full block"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className="ml-auto block px-8 bg-blue-400 cursor-pointer hover:bg-blue-500 ">
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          <ItemDropdown name="See All Locations" collectionName="locations" />
        </div>
      )}
      {dropDown.isTag && (
        <div className="grid sm:grid-cols-2 gap-8 shadow p-4">
          <form onSubmit={handleTag} className="w-full block mt-4 space-y-2 ">
            <InputBox
              label="Tag :"
              value={tag}
              className="w-full block"
              onChange={(e) => setTag(e.target.value)}
            />
            <Button className="ml-auto block px-8 bg-blue-400 cursor-pointer hover:bg-blue-500 ">
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          <ItemDropdown name="See All Tags" collectionName="tags" />
        </div>
      )}
    </div>
  );
}
