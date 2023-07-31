import React, { Fragment } from "react";

const ImageUpload = ({
  progress = 0,
  image = "",
  resetImage,
  size = "",
  handleDeleteImage = () => {},
  ...props
}) => {
  return (
    <label
      className={`bg-[#f4f5f6] shadow-lg cursor-pointer relative flex items-center justify-center group ${
        size
          ? "w-[250px] h-[250px] rounded-full mx-auto"
          : "w-full rounded-lg h-[300px]"
      }`}
    >
      <input type="file" className="hidden" {...props} />
      {!image && progress !== 0 && (
        <div className="absolute w-16 h-16 border-8 border-t-8 border-green-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <img src="/img-upload.png" alt="" className="max-w-[100px] mb-5" />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img
            src={image}
            alt=""
            className={`object-cover w-full h-full ${
              size ? "rounded-full" : "rounded-lg"
            }`}
          />
          <button
            type="button"
            className="absolute flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 rounded-lg"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
