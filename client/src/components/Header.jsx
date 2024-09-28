import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);

  };

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if(searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
    }

  }, []);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">House</span>
            <span className="text-slate-700">Hunt</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-3 flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none text-slate-600 w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-3 items-center">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-700">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="rounded-full h-9 w-9 object-cover border-2 border-slate-500"
              />
            ) : (
              <li className="hover:underline text-slate-700">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
