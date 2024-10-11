import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios';

const SignupPage = () => {
  const [roles, setRoles] = useState([]); // Initialize as an empty array
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
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

  // Form submission
  const submitForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Data to submit
    const newUser = {
      fullname,
      email,
      username,
      role_id: role,
      password,
    };

    console.log(newUser);

    await axios.post('/api/signup', newUser)
      .then((response) => {
        toast.success('User added successfully');
        navigate('/login'); // Redirect after successful registration
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors); // Validation errors
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  return (
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container max-w-lg mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">

          <form className="space-y-6" onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
              <input
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname[0]}</p>}
            </div>

            {/* Email */}
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
            </div>

            {/* Username */}
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
            </div>

            {/* Role */}
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
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
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>

            {/* Submit Button */}
            <div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
                Sign Up
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );

};

export default SignupPage;
