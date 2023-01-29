import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';


function App() {
  const isAuth=Boolean(useSelector((state)=>state.token));

  return (
   <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth?<Home/>:<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
