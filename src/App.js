import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import HomeComp from './components/HomeComp';
import AboutComp from './components/AboutComp';
import NoteState from "./context/notes/NoteState";
import AlertComp from './components/AlertComp';
import LoginComp from './components/LoginComp';
import SignupComp from './components/SignupComp';
import { useContext, useEffect } from 'react';
import alertContext from './context/alerts/AlertContext';
import { useState } from 'react';




function App() {
  const context = useContext(alertContext);
  const { alert } = context;

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, [])
  


  const getUser = async () => {
    
    let url = `https://cloud-notes-backend1.vercel.app/api/auth/getuser`;
    let params = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      },
    }
    const response = await fetch(url, params);
    //   eslint-disable-next-line
    const json = await response.json();
    setUser(json.userFind.name);
  }


  return (
    <>
      <NoteState>
        <NavbarComp name={user}/>
        <AlertComp alert={alert} />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/about" element={<AboutComp />} />
          <Route path="/login" element={<LoginComp getUser={getUser}/>} />
          <Route path="/signup" element={<SignupComp getUser={getUser}/>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;