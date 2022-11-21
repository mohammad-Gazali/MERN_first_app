import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex py-4 border-b-2 items-center">
      <div className="font-bold text-2xl">
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul className="flex justify-center items-center ml-auto gap-4 text-lg">
        <li className="hover:text-blue-700 transition-all">
          <Link to='/login' className="flex justify-center items-center gap-1">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li className="hover:text-blue-700 transition-all">
          <Link to='/register' className="flex justify-center items-center gap-1">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header