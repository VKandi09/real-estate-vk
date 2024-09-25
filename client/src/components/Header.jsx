import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">House</span>
                    <span className="text-slate-700">Hunt</span>
                </h1>
            </Link>
            <form className="bg-slate-100 rounded-lg p-3 flex items-center">
                <input type="text" placeholder="Search.." className="bg-transparent focus:outline-none text-slate-600 w-24 sm:w-64"></input>
                <FaSearch className="text-slate-600"/>
            </form>
            <ul className="flex gap-3 items-center">
                <Link to="/">
                    <li className="hidden sm:inline hover:underline text-slate-700">Home</li>
                </Link>
                <Link to="/about">
                    <li className="hidden sm:inline hover:underline text-slate-700">About</li>
                </Link>
                <Link to="/profile">
                    { currentUser ? (
                        <img src={currentUser.avatar} alt="avatar" className="rounded-full h-9 w-9 object-cover border-2 border-slate-500"/>
                    ) : (
                        <li className="hover:underline text-slate-700">Sign In</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header