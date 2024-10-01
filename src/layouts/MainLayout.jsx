import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>    
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
      <ToastContainer />
    </>
  );
};
export default MainLayout;
