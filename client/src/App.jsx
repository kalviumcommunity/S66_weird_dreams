
import LandingPage from './components/LandingPage'
import { Route, Routes } from "react-router-dom";
import Dreams from './components/Dreams'
import DreamForm from './components/DreamForm';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dreams/:userId" element={<Dreams />}></Route>
        <Route path="/add-dream" element={<DreamForm/>} />
      </Routes>
    </>
  );
}

export default App
