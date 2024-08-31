import { Link } from "react-router-dom";
import { GoBookmarkFill } from "react-icons/go";

const BookmarksCard = ({ bookmarks }) => {
  return (
    <div className="p-3 rounded-xl shadow-2xl h-auto flex flex-col justify-between hover:scale-105 transition-all duration-150 bg-[#242424] text-gray-100 mt-10 gap-5">
      <div className="flex flex-row max-h-[40%] items-center justify-start text-xl gap-2 text-gray-400">
        <GoBookmarkFill />
        <h1>Bookmarks</h1>
      </div>
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.slice(0, 10).map((article, i) => (
          <Link
            key={i}
            className="flex flex-row gap-5"
            to={article?.url}
            target="_blank"
          >
            <h1 className="text-xl font-abc text-gray-400">#{i + 1}</h1>
            <h3 className="text-md">{article?.title?.substring(0, 40)}...</h3>
          </Link>
        ))
      ) : (
        <p className="text-gray-400 mt-5">No bookmarks found</p>
      )}
    </div>
  );
};

export default BookmarksCard;
