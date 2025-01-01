import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar: React.FC = () => {
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setAuthorName(name);
    }
  }, []);

  return (
    <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
      <Link to={"/blogs"} className="flex flex-col justify-center font-medium ">
        Medium
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name={authorName || "Anonymous"} />
      </div>
    </div>
  );
};