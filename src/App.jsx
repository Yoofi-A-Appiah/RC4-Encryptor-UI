import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import Layout from './components/Layout';
import ProtectedRoute from './views/protectedView';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout element={<Home />}/>} />
        
        <Route path="/login" element={<Layout element={<Login />} />} />
        <Route path="/signup" element={<Layout element={<Signup />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
