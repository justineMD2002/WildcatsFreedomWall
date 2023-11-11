import React, { useState } from "react";
import './addpostbtn.css'
 

function Addpost({ onClick, handleReceivedData }) {
  const [inputValue, setInputValue] = useState("");
  const [showed, setShowed] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    var isConfirmed = false, reset = false;
    e.preventDefault();
    console.log("Input Value:", inputValue);

    if (!showed) {
      isConfirmed = window.confirm(
        "Are you sure you want to post? Press submit again to confirm."
      );

      if (isConfirmed) {
        setShowed(true);
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log("User canceled the post.");
        // Handle cancel logic here
        setShowed(false);
        setInputValue("");
        return;
      }
    }
    
    onClick(inputValue);
    handleReceivedData();
  };

  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        What's on your mind?
      </label>
      <textarea
        id="message"
        rows="4"
        value={inputValue}
        onChange={handleChange}
        className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
      ></textarea>
        <button
          onClick={handleSubmit}
          className="continue-application relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          style={{ marginBottom: "2rem", marginTop: "1rem" }}
        >
          <div>
            <div class="pencil"></div>
            <div class="folder">
              <div class="top">
                <svg viewBox="0 0 24 27">
                  <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                </svg>
              </div>
              <div class="paper"></div>
            </div>
          </div>
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
    </div>
  );
}

export default Addpost;
