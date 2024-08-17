import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/signup/Signup';
import Signin from './Components/signin/Signin';
import Home from './Components/homepage/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import TableSection from './Components/RightSection/TableSection';
import Log from './Components/RightSection/Log';
import UserSection from './Components/RightSection/UserSection';
import MenuSection from './Components/RightSection/MenuSection';
import Attendance from './Components/RightSection/Attendance';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Signin/>} />
          <Route path='/home' element={<Home/>}> 
            <Route path='table' element={<TableSection/>} />    
            <Route path='/home/menu' element={<MenuSection/>} />    
            <Route path='/home/user' element={<UserSection/>} />    
            <Route path='/home/log' element={<Log/>} />    
            <Route path='/home/attendance' element={<Attendance/>} />    
            {/* whole path should be given even if it is children route OR just give name of route not / */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
