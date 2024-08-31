import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fallBackImg from "../assets/fallBackImg.webp";
import { HiBookmarkSlash, HiBookmark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
};

const Modal = ({ showModal, setShowModal, article }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(
      bookmarks.some(
        (bookmarkedArticle) => bookmarkedArticle.url === article.url
      )
    );
  }, [article.url]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(
        (bookmarkedArticle) => bookmarkedArticle.url !== article.url
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      bookmarks.push(article);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const formattedDate = article
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-transparent z-40"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            className="bg-[#242424] rounded-lg p-6 max-w-md w-full relative z-50"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              className="absolute top-3 right-3 text-gray-100 text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center mt-5">
              <img
                src={article?.image || fallBackImg}
                alt="News Image"
                className="rounded-lg w-full h-64 object-cover"
              />
              <h3 className="text-lg font-bold mt-4 text-gray-100">
                {article?.title}
              </h3>
              <p className="text-gray-500 mt-2">{formattedDate}</p>
              <p className="text-gray-100 mt-4">{article?.description}</p>

              <Link
                to={article?.url}
                target="_blank"
                className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] px-20 py-2 font-bold text-lg text-center hover:opacity-90 rounded-full text-black mt-2"
              >
                Visit
              </Link>
              <button
                onClick={handleBookmark}
                className={`mt-4 px-8 py-2 font-bold text-lg rounded-full ${
                  isBookmarked
                    ? "bg-red-500 text-white "
                    : "bg-gray-500 text-white "
                } `}
              >
                {isBookmarked ? (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <HiBookmarkSlash />
                    Remove Bookmark
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <HiBookmark />
                    Add to Bookmark
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
