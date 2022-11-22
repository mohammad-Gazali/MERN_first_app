import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset())
    navigate('/login'); 
  }

  return (
    <header className="flex py-4 border-b-2 items-center">
      <div className="font-bold text-2xl">
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul className="flex justify-center items-center ml-auto gap-4 text-lg">
        { user ? (
          <li className="hover:text-blue-700 transition-all">
            <button 
            onClick={onLogout} className="flex justify-center items-center gap-1">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (<>
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
        </>) }
        
      </ul>
    </header>
  )
}

export default Header