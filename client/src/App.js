import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import { useNavigate } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);
  console.log("user in app: ", user);

  return(
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ user ? <Navigate to="/home" /> : < Login setUser={setUser} />} />
        <Route path="/home" element={ user ? < HomePage user={user} />  : <Navigate to="/login" />  } />
      </Routes>
  )
}

export default App;
