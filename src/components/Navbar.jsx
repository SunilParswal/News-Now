import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { TfiInkPen } from "react-icons/tfi";
import { motion } from "framer-motion";
import { IoBookmarks } from "react-icons/io5";

const Navbar = () => {
  const [menuOn, setMenuOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transitionEnd: {
        display: "none",
      },
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const showMenu = () => {
    setMenuOn(!menuOn);
  };

  return (
    <div className="w-full">
      <nav className="flex flex-col bg-[#242424] p-6 h-min relative">
        <div className="flex overflow-hidden justify-center gap-28">
          <div className="w-max flex items-center  text-white mr-6 gap-10">
            <Link
              className="flex items-center gap-3 font-semibold text-xl"
              to={"/"}
            >
              <TfiInkPen className="text-3xl" /> NewsNow
            </Link>
            <div className="w-full hidden lg:flex items-center gap-10">
              <input
                type="search"
                className="rounded-full p-2 text-gray-300 w-[300px] bg-[#131212]"
                placeholder="Search News..."
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Link
                to={`/search?query=${searchQuery}`}
                className="p-2 ml-2 rounded-full text-xl bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] text-slate-900 hover:scale-95 hover:opacity-90"
                hidden={searchQuery === ""}
              >
                <FaSearch />
              </Link>
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="text-[#FEAB88] hover:text-white">
                  Categories
                </button>
                <motion.div
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  variants={variants}
                  className="absolute bg-[#242424fa] rounded-md shadow-lg p-4 mt-2 "
                >
                  <Link
                    to="/"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Home
                  </Link>
                  <Link
                    to="/health"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Health
                  </Link>
                  <Link
                    to="/science"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Science
                  </Link>
                  <Link
                    to="/technology"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Technology
                  </Link>
                  <Link
                    to="/sports"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Sports
                  </Link>
                  <Link
                    to="/entertainment"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Entertainment
                  </Link>
                  <Link
                    to="/business"
                    className="block text-[#FEAB88] hover:text-white mb-2"
                  >
                    Business
                  </Link>
                </motion.div>
              </div>
            </div>
            <Link to={"/bookmarks"} className="hidden lg:flex">
              <span className="flex items-center gap-3 font-semibold text-xl text-[#FEAB88] hover:text-white">
                <IoBookmarks />
                Bookmarks
              </span>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 text-gray-100 text-xl"
              onClick={() => {
                showMenu();
              }}
            >
              {menuOn ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
        <div
          className={`menu absolute items-center justify-center left-0 top-16 w-full flex flex-col gap-2 lg:hidden p-3 transition-all duration-300 bg-[#131212] z-[5] ${
            menuOn ? "translate-y-0" : "translate-y-[-150%]"
          } `}
        >
          <Link
            to="/"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Home
          </Link>
          <Link
            to="/health"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Health
          </Link>
          <Link
            to="/science"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Science
          </Link>
          <Link
            to="/technology"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Technology
          </Link>
          <Link
            to="/sports"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Sports
          </Link>
          <Link
            to="/entertainment"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Entertainment
          </Link>
          <Link
            to="/business"
            className="block lg:inline-block lg:mt-0 text-[#FEAB88] hover:text-white mr-4"
            onClick={() => {
              setMenuOn(!menuOn);
            }}
          >
            Business
          </Link>
          <Link to={"/bookmarks"} className="block">
            <span className="flex items-center gap-3 font-semibold text-xl text-[#FEAB88] hover:text-white">
              <IoBookmarks />
              Bookmarks
            </span>
          </Link>

          <div className="w-full flex items-center justify-center">
            <input
              type="search"
              className=" rounded-full p-2 w-[90%] text-gray-300 bg-[#242424e4]"
              placeholder="Search News..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Link
              to={`/search?query=${searchQuery}`}
              onClick={() => {
                setMenuOn(!menuOn);
              }}
              className="p-2 ml-2 rounded-full text-xl bg-gradient-to-r from-[#F07946] to-[#FEAB88] hover:from-[#F07946] hover:to-[#FEAB88] text-slate-900 hover:scale-95 hover:opacity-90"
              hidden={searchQuery === ""}
            >
              <FaSearch />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
