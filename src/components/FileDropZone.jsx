import { useState } from "react";

const FileDropZone = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer transition
          ${
            dragActive
              ? "bg-gray-200 border-blue-500"
              : "bg-gray-50 border-gray-300"
          }
           hover:bg-gray-100 `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
          {file && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              File selected: {file.name}
            </p>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileDropZone;
