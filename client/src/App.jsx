import LandingPage from './pages/LandingPage'
import { Route, Routes } from "react-router-dom";
import Dreams from './pages/Dreams'
import AddDream from './pages/AddDream';
import EditDream from './pages/EditDream';
import CreatedBy from './pages/CreatedBy';
import UserDreams from './pages/UserDreams'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dreams" element={<Dreams />}></Route>
        <Route path="/dreams/:userId" element={<UserDreams/>}></Route>
        <Route path="/add-dream" element={<AddDream />} />
        <Route path="/edit-dream/:dreamId" element={<EditDream />} />
        <Route path="/users" element={<CreatedBy />} />
      </Routes>
    </>
  );
}

export default App
