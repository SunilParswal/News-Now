import React, { useEffect, useState } from "react";
import { getNews } from "../api/getNews";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";

const Entertainment = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [category, setCategory] = useState("entertainment");
  const [loading, setLoading] = useState(false);

  const get_news = async () => {
    try {
      setLoading(true);
      const data = await getNews(category, page, pageSize);

      setNews(data?.articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    get_news();
    document.title = `Top Headlines - Entertainment`;
  }, [page]);

  const handleBack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(page - 1);
    if (page > 1) {
      try {
        const data = await getNews(category, page - 1, pageSize);
        setNews(data?.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(page + 1);
    try {
      const data = await getNews(category, page + 1, pageSize);
      setNews(data?.articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-gray-100 font-abc capitalize mt-5 text-3xl">
        {category}
      </h1>
      {!loading && news?.length > 0 ? (
        <>
          <div className="w-full p-3 grid gap-2 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 ml-8 mr-8">
            {news?.map((article, i) => (
              <NewsCard article={article} key={i} />
            ))}
          </div>
          <div className="w-2/4 flex justify-between">
            <button
              className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] p-3 px-6 text-md text-center hover:opacity-90 rounded-full text-black m-3 mb-5"
              onClick={handleBack}
              disabled={page <= 1 || !news}
            >
              Back
            </button>
            <button
              className="btn-orange bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] p-3 px-6 text-md text-center hover:opacity-90 rounded-full text-black m-3 mb-5 "
              onClick={handleNext}
              disabled={news?.length < pageSize || !news}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  );
};

export default Entertainment;
