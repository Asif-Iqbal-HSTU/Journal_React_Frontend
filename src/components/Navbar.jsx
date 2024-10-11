import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import axios from '../axios';
import { toast } from 'react-toastify';
import 'flowbite';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/logout');  // Logout API call
      if (response.status === 200) {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <NavLink className="flex items-center space-x-3" to="/">
          <img src={logo} className="h-10" alt="Logo" />
          <span className="self-center text-2xl font-semibold">HSTU Journal</span>
        </NavLink>

        {/* Hamburger menu button for mobile */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMenu}
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu Links */}
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0'
                }
              >
                Home
              </NavLink>
            </li> */}
            {isLoggedIn ? (
              <>
                {userRole == "Author" ?
                  (
                    <>
                      <li>
                        <NavLink
                          to="/papers"
                          className={({ isActive }) =>
                            isActive
                              ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                              : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                          }
                        >
                          Author Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/addNewMenuscript"
                          className={({ isActive }) =>
                            isActive
                              ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                              : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                          }
                        >
                          Submit New Menuscript
                        </NavLink>
                      </li>

                    </>
                  ) :
                  (
                    <>
                      {userRole == "Editor" ?
                        (
                          <>
                            <li>
                              <NavLink
                                to="/jobs"
                                className={({ isActive }) =>
                                  isActive
                                    ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                                }
                              >
                                Editor Dashboard
                              </NavLink>
                            </li>
                          </>
                        ) :
                        (
                          <>

                          </>
                        )}
                    </>
                  )}
                <li>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                        : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-job"
                    className={({ isActive }) =>
                      isActive
                        ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                        : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                    }
                  >
                    Add Job
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                        : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? 'block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:text-blue-700 md:p-0'
                        : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent md:p-0'
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
