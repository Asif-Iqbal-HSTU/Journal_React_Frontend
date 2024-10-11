import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import PapersPage from './pages/author/PapersPage';
import PaperPage from './pages/author/PaperPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AddNewMenuscript from './pages/author/AddNewMenuscript';
import PaperForm from './pages/PaperForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role.title);
      console.log("Role: " + user.role.title);
    }

  }, []);

  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await res.json();
      console.log('Job added successfully:', data.message);
    } catch (error) {
      console.error('Error adding job:', error.message);
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`http://127.0.0.1:8000/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole} />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route path='/login' element={<LoginPage isLoggedIn={isLoggedIn}/>} /> */}
        <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />

        <Route path='/addNewMenuscript' element={<AddNewMenuscript />} />
        <Route path='/paperForm' element={<PaperForm />} />


        {/* <Route path='/papers' element={<PapersPage />} /> */}
        <Route path='/papers' element={<PapersPage />} />
        <Route path='/paper/:id' element={<PaperPage />} /> {/* New Route */}

      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
