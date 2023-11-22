import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import RoundHome from './Components/Events/RoundsPage/RoundHome';
import Instruction from './Components/Events/InstructionsComponent/Instructions';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminLogout from './Components/Admin/AdminLogout';
import UserLogout from './Components/User/UserLogout';
import NotFound from './Components/NotFound';
import AdminNavbar from './Components/Admin/AdminNavbar';
import RoundAdder from './Components/Admin/RoundAdder';
import Events from './Components/Admin/Events';
import MCQ from "./Components/questions/mcq/MCQ"
import Coding from "./Components/codingContest/CodingHome"
import Fff from "./Components/questions/FastestFingerFirst/FffHome"
import Scoreboard from "./Components/Scoreboard/Scoreboard"
import Puzzle from "./Components/questions/puzzle/Puzzlehome"
import Login from "./Components/User/Login"
import Psuedocode from "./Components/questions/Psuedocode/PSHome"
import ContactUs from './Components/ContactUs';
import EditorContainer from './Components/codingContest/EditorContainer';
import RoundActivate from './Components/Admin/RoundActivate';
import GoToForm from './Components/Events/LinkRound/Link';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const getLogin = () => {
  if (localStorage.getItem("userTokenPortal"))
    return ("user")
  if (localStorage.getItem("adminTokenPortal"))
    return ("admin")
  else
    return ("nologin")
}

function disableRightClick() {
  document.addEventListener("contextmenu", (event) => {
    toast.error("Not allowed");
    event.preventDefault();
  });
}



function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/round/u/', { replace: true });
  }, []);
}

function App() {
  useEffect(() => {
    disableRightClick();
    
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        toast.error("Not allowed");
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (getLogin() === "user") {
    return (
      <>
      <Router>
          <Routes>
            <Route exact path="/" element={<Homepage/>}/>
            <Route exact path="/logout" element={<UserLogout />} />
            <Route path="*" element={<NotFound />} replace={true}/>
            <Route exact path="/round/u/" element={<RoundHome />} />
            <Route exact path="/contact" element={<ContactUs />} />
            {/* <Route exact path="/round/u/:roundName/:roundId/instruction" element={<Instruction />} /> */}
            {/* <Route exact path="/round/u/:roundName/:roundId/FFF" element={<Fff />} />
            <Route exact path="/round/u/:roundName/:roundId/CODING" element={<Coding  />} /> 
            <Route exact path="/round/u/:roundName/:roundId/CODING/q/:questionName/:questionId" element={<CodingQuestion  />} /> 
            <Route exact path="/round/u/:roundName/:roundId/MCQS" element={<MCQ />} />
            <Route exact path="/round/u/:roundName/:roundId/PUZZLE" element={<Puzzle />} /> */}
            
            <Route exact path="/round/u/instruction" element={<Instruction />} />
            <Route exact path="/round/u/FFF" element={<Fff />} />
            <Route exact path="/round/u/CODING" element={<Coding  allowFullScreen/>} /> 
            <Route exact path="/round/u/MCQS" element={<MCQ />} />
            <Route exact path="/round/u/PUZZLE" element={<Puzzle />} />
            <Route exact path="/round/u/psuedocode" element={<Psuedocode />} />
            <Route exact path="/round/u/link" element={< GoToForm  />} />
            <Route exact path="/round/u/scoreboard" element={<Scoreboard />} />
            
            <Route exact path="/editor" element={<EditorContainer />} />
              
          </Routes>
      </Router>
      <ToastContainer/>
      </>
    );
  }
  else if (getLogin() === "admin") {
    return (
      <Router>
        <AdminNavbar />
        <Routes>
          <Route exact path="/" element={<Events />} />
          <Route exact path="/admin/logout" element={<AdminLogout />} />
          <Route exact path="/admin/activate" element={<RoundActivate />} />
          <Route exact path="/admin/addround" element={<RoundAdder />} />
          <Route path="*" element={<NotFound />} replace={true} />
        </Routes>
      </Router>
    );
  }
  else if (getLogin() === "nologin") {
    return (
      <Router>
        <Routes>
          <Route exact path="*" element={<Login />} />
          <Route exact path="/admin" element={<AdminLogin />} />
        </Routes>
      </Router>
    );
  }

}

export default App;
