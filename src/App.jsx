import './App.css';
import Home from './Components/Home/Home';
import Signup from './Components/SignUp/SignUp';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./FireBase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';
import Upload from './Components/Uplode/Uplode'
import Details from './Components/DetailsPage/Details';
import UserAds from './Components/UserAds/UserAds';
function App() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {

      if (user) {
        console.log("Logged in");
        updateUser({ uid: user.uid, email: user.email});

        // if (location.pathname === "/"){
          navigate('/');
        
        
      } else {
        console.log("Logged out");
        updateUser(null);
        
          navigate('/login');
        
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme="light" />
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Signup />} />
        <Route path='/uplode' element={<Upload />} />
        <Route path='/details/:productId' element={<Details />} />
        <Route path='/userAds' element={<UserAds />} />
      
      </Routes>
    </div>
  );
}

export default App;
