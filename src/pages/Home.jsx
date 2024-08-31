import React, { useEffect, useState } from "react";
import { getNews } from "../api/getNews";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import TrendingCard from "../components/TrendingCard";
import BookmarksCard from "../components/BookmarksCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const get_news = async () => {
    try {
      setLoading(true);
      const data = await getNews(category, page, pageSize);
      console.log(data);
      setNews(data?.articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    get_news();
    document.title = `Home - General`;
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
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-gray-100 font-abc capitalize mt-5 text-3xl">Home</h1>
      {!loading && news?.length > 0 ? (
        <>
          <div className="lg:flex lg:flex-row w-full">
            <div className="w-[70%] p-3 grid gap-2 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 ml-8 mr-8">
              {news?.map((article, i) => (
                <NewsCard article={article} category={category} key={i} />
              ))}
            </div>
            <div className="hidden lg:block w-[400px] mt-10 mr-10">
              <div className="sticky top-5">
                <TrendingCard news={news} />
                <BookmarksCard bookmarks={bookmarks} />
              </div>
            </div>
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

export default Home;
