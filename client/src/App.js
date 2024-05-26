import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/home/Home';
import Login from './Pages/login/login';
import SignUp from './Pages/sign up';
import DashBoard from './Pages/dashboard/DashBoard';
import JobProfile from './Pages/job profile/JobProfile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/jobprofiles' element={<JobProfile />} />
    </Routes>
  );
}

export default App;
