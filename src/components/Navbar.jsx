import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import axios from '../axios';
import { toast } from 'react-toastify';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    try {
      axios.get('/api/logout');  // Logout API call
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-green-700 border-b border-green-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <NavLink className="flex items-center" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="text-white text-xl font-bold ml-2">
                HSTU Journal
              </span>
            </NavLink>
          </div>

          {/* Hamburger menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
              Home
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/jobs" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                  Add Job
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                  Login
                </NavLink>
                <NavLink to="/signup" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 py-4">
              <NavLink to="/" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                Home
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink to="/jobs" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                    Jobs
                  </NavLink>
                  <NavLink to="/add-job" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                    Add Job
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
