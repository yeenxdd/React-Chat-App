import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return <>
    <Routes>
      <Route path='/' element={<Chat />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  </>
}

export default App
