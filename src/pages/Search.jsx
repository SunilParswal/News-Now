import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [urlParams] = useSearchParams();

  useEffect(() => {
    const search = urlParams.get("query");
    const get_news = async () => {
      setLoading(true);
      try {
        let url = "";
        const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API;
        if (!search) {
          url = `https://gnews.io/api/v4/search?q=latest&lang=en&country=in&sortBy=publishedAt&page=${page}&max=${pageSize}&token=${GNEWS_API_KEY}`;
        } else {
          url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=in&sortBy=publishedAt&page=${page}&max=${pageSize}&token=${GNEWS_API_KEY}`;
        }
        const res = await fetch(url);
        const data = await res.json();

        setNews(data?.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    document.title = `Search - ${search}`;
    get_news();
  }, [urlParams, page]);

  const handleBack = async (e) => {
    e.preventDefault();
    if (page > 1) {
      setLoading(true);
      setPage(page - 1);
      try {
        const search = urlParams.get("query");
        let url = "";
        const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API;
        if (!search) {
          url = `https://gnews.io/api/v4/search?q=latest&lang=en&country=in&sortBy=publishedAt&page=${
            page - 1
          }&max=${pageSize}&token=${GNEWS_API_KEY}`;
        } else {
          url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=in&sortBy=publishedAt&page=${
            page - 1
          }&max=${pageSize}&token=${GNEWS_API_KEY}`;
        }
        const res = await fetch(url);
        const data = await res.json();
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
      const search = urlParams.get("query");
      let url = "";
      const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API;
      if (!search) {
        url = `https://gnews.io/api/v4/search?q=latest&lang=en&country=in&sortBy=publishedAt&page=${
          page + 1
        }&max=${pageSize}&token=${GNEWS_API_KEY}`;
      } else {
        url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=in&sortBy=publishedAt&page=${
          page + 1
        }&max=${pageSize}&token=${GNEWS_API_KEY}`;
      }
      const res = await fetch(url);
      const data = await res.json();
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
        {urlParams.get("query")}
      </h1>

      {!loading && news?.length > 0 ? (
        <>
          <div className="w-full p-3 grid gap-2 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mr-8 ml-8 mt-8">
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

export default Search;
