import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Signup from '../src/AuthSystem/signup/Signup';
import Signin from '../src/AuthSystem/signin/Signin';
import Home from './Admin/Components/homepage/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import TableSection from './Admin/Components/RightSection/TableSection';
import Log from './Admin/Components/RightSection/Log';
import UserSection from './Admin/Components/RightSection/UserSection';
import MenuSection from './Admin/Components/RightSection/MenuSection';
import Attendance from './Admin/Components/RightSection/Attendance';
import MainPage from './Waiter/Components/MainPage/MainPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Signup/>} /> */}
          <Route path='/' element={<Signin/>} />
          <Route path='/waiter' element={<MainPage/>} />
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
