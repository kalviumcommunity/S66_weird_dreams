import LandingPage from './pages/LandingPage'
import { Route, Routes, Navigate } from "react-router-dom";
import Dreams from './pages/Dreams'
import AddDream from './pages/AddDream';
import EditDream from './pages/EditDream';
import CreatedBy from './pages/CreatedBy';
import UserDreams from './pages/UserDreams'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dreams"
          element={
            <ProtectedRoute>
              <Dreams />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/dreams/:userId" element={<UserDreams/>}></Route>
        <Route 
          path="/add-dream" 
          element={
            <ProtectedRoute>
              <AddDream />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-dream/:dreamId" 
          element={
            <ProtectedRoute>
              <EditDream />
            </ProtectedRoute>
          } 
        />
        <Route path="/users" element={<CreatedBy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
