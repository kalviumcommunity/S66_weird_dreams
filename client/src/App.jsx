
import LandingPage from './components/LandingPage'
import { Route, Routes } from "react-router-dom";
import Dreams from './components/Dreams'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/dreams/:userId' element={<Dreams/>}></Route>
      </Routes>
    </>
  )
}

export default App
