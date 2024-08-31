export const getNews = async (category, page, pageSize) => {
  try {
    const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API;
    const GNEWS_API_URL = `https://gnews.io/api/v4/top-headlines?country=in&topic=${category}&token=${GNEWS_API_KEY}&page=${page}&max=${pageSize}`;

    let response = await fetch(GNEWS_API_URL);
    let finalData = await response.json();
    console.log(finalData);

    return {
      articles: finalData?.articles,
      totalResults: finalData?.totalArticles,
    };
  } catch (error) {
    console.log(error);
  }
};
