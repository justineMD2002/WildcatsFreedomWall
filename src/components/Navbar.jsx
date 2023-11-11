import React, { useState } from "react";
import Addpost from "./Addpost";

function Navbar({onClick }) {
  const [isAddPostVisible, setAddPostVisible] = useState(false);
  const [inputValue, setInputValue] = useState(false);

  const toggleAddPost = () => {
    setAddPostVisible(!isAddPostVisible);
  };

  const getDataFromAddPost = (inputValue) => {
    setInputValue(inputValue)
  }

  const handleReceivedData = () => {
    onClick(inputValue);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full h-1/8" style={{ marginBottom: "1rem", color: "#27374D" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <img
            src="https://logodix.com/logo/684440.jpg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Wildcats Freedom Wall
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default" >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" >
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page" style={{ color: "#27374D" }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page" style={{ color: "#27374D" }}
                onClick={toggleAddPost}
              >
                Add Post
              </a>
            </li>
          </ul>
        </div>
      </div>
        {isAddPostVisible && <Addpost onClick={getDataFromAddPost} handleReceivedData={handleReceivedData} />}
    </nav>
  );
}
export default Navbar;