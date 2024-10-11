import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
// { isLoggedIn, userRole }
const MainLayout = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  return (
    <>    
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole}/>
      <Outlet />
      <ToastContainer />
    </>
  );
};
export default MainLayout;
