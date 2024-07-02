import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoute';
import Home from './pages/Home'
import Login from './pages/Login';
import Verify from './pages/Verify';

function App() {
  return (
    <div className="app flex flex-col items-center justify-center">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route element={<Login />} path='/login' />
          <Route element={<Verify />} path='/login/verify' />
        </Routes>
      </Router>
    </div>
  )
}

export default App
