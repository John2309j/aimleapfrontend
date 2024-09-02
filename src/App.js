import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Loginpage from './pages/login';
import SignUpPage from './pages/signup';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/admindashboard';
import {Toaster} from 'react-hot-toast'
import axios from 'axios';

function App() {


  return (
    <div className="App">
      <div><Toaster/></div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
      </Routes>

      </BrowserRouter>
    
    </div>
  );
}

export default App;
