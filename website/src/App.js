import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RegisterPage from './Components/User/RegisterPage';
import Login from './Components/User/Login';
import EventAdder from './Components/Admin/EventAdder';
import Home from './Components/User/Home';
import AdminHome from './Components/Admin/AdminHome';
import UserLogout from './Components/User/UserLogout';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminLogout from './Components/Admin/AdminLogout';
import AdminNavbar from './Components/Admin/AdminNavbar';
import ProfileSection from './Components/User/ProfileSection';
import About from './Components/User/About';
import Cart from './Components/User/Cart';
import Events from './Components/User/Events';
import Events2 from './Components/User/Events2';
import Demo from './Components/User/Demo';
import PayComplete from './Components/User/PayComplete';
import ContactUs from './Components/User/ContactUs';
import AdminAbout from './Components/Admin/AdminAbout';
import Stats from './Components/Admin/Stats';
import ForgotPassword from './Components/User/ForgotPassword'

import AdminContact from './Components/Admin/AdminContact';
import NotFound from './Components/User/NotFound';
import Privacypolicy from './Components/User/privacypolicy';
import TermsConditions from './Components/User/Terms';
import Leaderboard from './Texrace/Leaderboard';
import Refund from './Components/User/return';


import { Toaster } from 'react-hot-toast';

//texrace imports
import TexraceHome from './Texrace/Home'
import TexraceGame from './Texrace/Index'

//texrace imports
import RouteHome from './Route51/Home'
import RouteGame from './Route51/index'

//24-Hits imports
import HitHome from './24-Hits/Home'
import HitGame from './24-Hits/index'
import Game from './Components/User/game';

const getUser = () =>
{
  if(localStorage.getItem("adminToken"))
    return("admin")
  else
    return("notadmin")
}

function App() {

  if(getUser() === "admin")   // Inside each route you have to check if Admin Token is valid or not.
  {
    return (
      <>
      <Router>
        <AdminNavbar />
        <Routes>
          <Route exact path = "/admin/home" element = {<AdminHome />}/>
          <Route exact path = "/admin/about" element = {<AdminAbout />}/>
          <Route exact path = "/admin/contact" element = {<AdminContact />}/>
          <Route exact path = "/admin/stats" element = {<Stats />}/>
          <Route exact path = "/admin/events" element = {<EventAdder />}/>
          <Route exact path = "/admin/logout" element = {<AdminLogout />}/>

          <Route path="*" element = {<Navigate to="/admin/home" replace={true} />} />
        </Routes>
      </Router>
      <Toaster />
      </>
    );
  }

  else if(getUser() === "notadmin")
  {
    return (
      <>
      <Router>
        <Routes>
          <Route exact path = "/profile" element = {<ProfileSection />}/>
          <Route exact path = "/register" element = {<RegisterPage />}/>
          <Route exact path = "/about" element = {<About />}/>
          <Route exact path = "/contact" element = {<ContactUs />}/>
          <Route exact path = "/" element = {<Home />}/>
          <Route exact path = "/login" element = {<Login />}/>
          <Route exact path = "/admin" element = {<AdminLogin />}/>
          <Route exact path = "/events" element = {<Events2 />}/>
          <Route exact path = "/events1" element = {<Events />}/>
          <Route exact path = "/events2" element = {<Events2 />}/>
          <Route exact path = "/demo" element = {<Demo />}/>
          <Route exact path = "/payment-complete" element = {<PayComplete />}/>
          <Route exact path = "/logout" element = {<UserLogout />}/>
          <Route exact path = "/notfound" element = {<NotFound />}/>
          <Route exact path = "/privacy" element = {<Privacypolicy />}/>
          <Route exact path = "/terms" element = {<TermsConditions />}/>
          <Route exact path = "/refund" element = {<Refund />}/>
          <Route exact path = "/cart" element={<Cart />}/>
          <Route exact path = "/forgotpassword" element={<ForgotPassword/>}/>
          <Route exact path = "/payment" />
          <Route exact path = "/game" element={<Game />}/>
          <Route path="*" element = {<Navigate to="/notfound" replace={true} />} />

          <Route exact path = "/TexraceHome" element={<TexraceHome />}/>
          <Route exact path = "/TexraceGame" element={<TexraceGame />}/>
          <Route exact path = "/Leaderboard" element={<Leaderboard gameName="texrace" />}/>
         

          <Route exact path = "/RouteHome" element={<RouteHome />}/>
          <Route exact path = "/RouteGame/:maze" element={<RouteGame />}/>

          <Route exact path = "/HitGame" element={<HitGame />}/>
          <Route exact path = "/HitHome" element={<HitHome />}/>

        </Routes>
      </Router>
      <Toaster />
      </>
    );
  }
}

export default App;