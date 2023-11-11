import React from "react";

function Feed({ posts }) {
  return (
    <ol style={{ marginRight: "2rem", marginLeft: "2rem"}}>
      {posts.map((post, index) => (
        <li key={index} className="mb-5">
          {post && post.userAddress && post.text && (
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-600" style={{ backgroundColor: "#DDE6ED" }}>
              <div className="items-center justify-between mb-3 sm:flex">
                <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                  User: {post.userAddress.toString()} 
                </div>
              </div>
              <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                {post.text}
              </div>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default Feed;
