import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> 
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />

         <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
         <Route path='/profile' element={<Profile/>}/>
      </Routes>

    </div>
  );
}

export default App;
