import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoute';
import Home from './pages/Home'
import Login from './pages/Login';
import Upload from './pages/Upload'
import Verify from './pages/Verify';

function App() {
  return (
    <div className="app w-full flex flex-col items-center justify-center m-0 p-0">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<Upload />} path="/upload" />
          </Route>
          <Route element={<Login />} path='/login' />
          <Route element={<Verify />} path='/login/verify' />
        </Routes>
      </Router>
    </div>
  )
}

export default App
