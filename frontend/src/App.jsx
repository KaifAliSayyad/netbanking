import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from "./redux/UserAction";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from './components/Navbar'
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Netbanking from "./screens/Netbanking";
import Services from "./screens/Services";
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  
  useEffect(() => {
    handleUserLogin();
  }, []);

  function handleUserLogin(){
    const user = localStorage.getItem('user'); // Changed from 'currentUser' to 'user'
    console.log(user, "from use Effect");
    
    if (user) {
      dispatch(login_user(user));
      
      console.log(currentUser, "not null");
      
      
    } else {
      if (currentUser.id != null) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
    }
  }

  return (
    <div className="App">
      <div className="header">
        <Header />
        <ToastContainer />
      </div>
      <div className="body">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Routes>
            {console.log(currentUser, "from inside")}
            {currentUser.id != null
              ?
              <>
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/netbanking' element={<Netbanking />} />
                <Route path='/services' element={<Services />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </>
              :
              <>
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/netbanking' element={<Netbanking />} />
                <Route path='/services' element={<Services />} />
              </>
            }
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default App

