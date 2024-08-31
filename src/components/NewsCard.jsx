import React, { useState } from "react";
import fallBackImg from "../assets/fallBackImg.webp";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Modal from "./Modal"; // Import the Modal component

const NewsCard = ({ article, category }) => {
  const [showModal, setShowModal] = useState(false);
  const formattedDate = format(new Date(article?.publishedAt), "MMMM do, yyyy");

  return (
    <>
      <div className="p-3 rounded-xl shadow-2xl h-[400px] flex flex-col justify-between hover:scale-105 transition-all duration-150 bg-[#242424] text-gray-100">
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
        {/* <p className="truncate">{article?.description?.substring(0, 150)}...</p> */}
        <div className="flex flex-col gap-3">
          <Link
            to={article?.url}
            target="_blank"
            className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] p-1 font-bold text-lg text-center hover:opacity-90 rounded-full text-black"
          >
            Visit
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] p-1 font-bold text-lg text-center hover:opacity-90 rounded-full text-black"
          >
            Quick View
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        article={article}
      />
    </>
  );
};

export default NewsCard;
