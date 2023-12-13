"use client";

import { ClipLoader } from "react-spinners";

type LoaderProps = {
  size?: number;
};
export const Loader: React.FC<LoaderProps> = ({ size = 55 }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/5">
      <ClipLoader color="blue" size={size} />
    </div>
  );
};
