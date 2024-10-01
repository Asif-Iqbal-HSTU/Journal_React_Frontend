import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios';

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');  
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch roles from API on component mount
  useEffect(() => {
    axios.get('/api/roles')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRoles(response.data);  // Set roles if response is an array
        } else {
          setRoles([]); // Fallback if data is not an array
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the roles!", error);
      });
  }, []);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const loginData = {
      username,
      role_id: role,
      password,
    };

    try {
      const response = await axios.post('/api/login', loginData);
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsLoggedIn(true); // Update login state
      navigate('/'); // Redirect to home
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid credentials');
      } else if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitLoginForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Username</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Role</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>Select Role</option>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No roles available</option>
                )}
              </select>
              {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id[0]}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
