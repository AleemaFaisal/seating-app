import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  console.log("user in app: ", user);

  return(
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ user ? <Navigate to="/home" /> : < Login setUser={setUser} />} />
        <Route path="/home" element={ user? < Home user={user} /> : <Navigate to="/login" /> } />
      </Routes>
  )
}

export default App;
