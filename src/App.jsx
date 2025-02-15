import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import FriendsLayout from './components/Friends/FriendsLayout.jsx';
//import CheckSignIn from './components/Friends/checkSignIn.jsx';


function App() {
  return (
    <>
    
    <ToastContainer />
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Signup/>} />
         <Route path='/dashboard' element={<> <Dashboard/></> } />
         <Route path='/dashboard/friends' element={<><FriendsLayout/></>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
