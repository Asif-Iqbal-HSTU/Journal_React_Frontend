import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios';

// const LoginPage = ({ setIsLoggedIn }) => {
const LoginPage = ({ setIsLoggedIn, setUserRole }) => {
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

      if (response.status === 200 && response.data.user) {
        toast.success(response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        //localStorage.setItem('user_role', response.data.user_role);
        //localStorage.setItem('user', response.data.user);
        //const curr_user = JSON.parse(localStorage.getItem('user'));
        //toast.success(curr_user.fullname);
        //setIsLoggedIn(true); // Update login state
        // Update the login state and role state
        setIsLoggedIn(true);
        setUserRole(response.data.user.role.title);
        navigate('/'); // Redirect to home
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          toast.error('User with this username and role not found');
        } else if (status === 401) {
          toast.error('Incorrect password');
        } else if (status === 422) {
          setErrors(data.errors); // Handle validation errors
        } else {
          toast.error('Something went wrong');
        }
      }
    }
  };


  return (
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto border border-gray-200">

          <form className="space-y-6" onSubmit={submitLoginForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            {/* Username Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Select Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
              >
                <option value="" disabled>Choose a Role</option>
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

            {/* Password Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                placeholder="••••••••"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );

};

export default LoginPage;
