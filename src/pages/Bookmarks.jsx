import React, { useState, useEffect } from "react";
import fallBackImg from "../assets/fallBackImg.webp";
import { format } from "date-fns";
import { HiBookmarkSlash } from "react-icons/hi2";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (url) => {
    const updatedBookmarks = bookmarks.filter((article) => article.url !== url);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-center mt-5 mb-5">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          Bookmarked Articles
        </h2>
      </div>
      <div className="w-[70%] p-3 grid gap-3 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 ml-8 mr-8">
        {bookmarks.length > 0 ? (
          bookmarks.map((article, index) => {
            const formattedDate = format(
              new Date(article.publishedAt),
              "MMMM do, yyyy"
            );
            return (
              <div
                key={index}
                className="p-3 mb-3 rounded-xl shadow-2xl h-[400px] w-full flex flex-col justify-between hover:scale-105 transition-all duration-150 bg-[#242424] text-gray-100"
              >
                <div className="flex justify-center max-h-[40%]">
                  <img
                    src={article?.image || fallBackImg}
                    alt="News Image"
                    className="rounded-xl"
                  />
                </div>
                <h3 className="text-2-3xl font-bold">
                  {article?.title?.substring(0, 50)}...
                </h3>
                <p className="text-sm text-gray-400">{formattedDate}</p>
                <div className="flex flex-row justify-evenly">
                  <h4 className="text-sm font-semibold bg-black w-max p-3 text-gray-300 rounded-full">
                    {article?.source?.name}
                  </h4>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={article?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] p-1 font-bold text-lg text-center hover:opacity-90 rounded-full text-black"
                  >
                    Visit
                  </a>
                  <button
                    onClick={() => handleRemoveBookmark(article.url)}
                    className="btn-orange bg-red-500 hover:bg-red-600 p-1 text-lg text-center hover:opacity-90 rounded-full text-white flex flex-row items-center justify-center gap-3"
                  >
                    <HiBookmarkSlash />
                    Remove Bookmark
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No bookmarks available.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
