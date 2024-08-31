import React from "react";
import fallBackImg from "../assets/fallBackImg.webp";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineTrendingUp } from "react-icons/hi";

const TrendingCard = ({ news }) => {
  return (
    <div className="p-3 rounded-xl shadow-2xl h-[600px] flex flex-col justify-between hover:scale-105 transition-all duration-150 bg-[#242424] text-gray-100">
      <div className="flex flex-row max-h-[40%] items-center justify-start text-xl gap-2 text-gray-400">
        <HiOutlineTrendingUp />

        <h1>Trending</h1>
      </div>
      {news?.slice(0, 10).map((article, i) => (
        <Link className="flex flex-row gap-5" to={article?.url} target="_blank">
          <h1 className="text-xl font-abc text-gray-400">#{i + 1}</h1>
          <h3 key={i} className="text-md">
            {article?.title?.substring(0, 40)}...
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default TrendingCard;
