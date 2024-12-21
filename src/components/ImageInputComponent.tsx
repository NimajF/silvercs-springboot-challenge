import { useState } from "react";

interface ImageInputProps {
  previewImage: string | null;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function ImageInputComponent({
  previewImage,
  setForm,
  setImage,
}: ImageInputProps) {
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      setImage(previewUrl);
      setForm((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 mb-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        Selecciona una Imágen
        {previewImage ? (
          <img
            src={previewImage as string}
            alt="Foto de perfil del camarero"
            height={100}
            width={100}
            className="rounded-md mt-2"
          />
        ) : (
          ""
        )}
        <div className="flex flex-col items-center justify-center pt-2 pb-2">
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
            <span className="font-semibold">Click subir una imágen</span> o
            arrastra
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
        </div>
        <input
          id="dropzone-file"
          name="imageFile"
          type="file"
          className="hidden"
          onChange={handleChangeImage}
        />
      </label>
    </div>
  );
}
